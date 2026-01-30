import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { v4 as uuidv4 } from "uuid";

const app = express();

// ====== Config ======
const PORT = process.env.PORT || 3000;

// ✅ Groq key
const GROQ_API_KEY = process.env.GROQ_API_KEY;

// اختياري: دومين الفرونت (GitHub Pages)
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "*";

// Rate limit
const LIMIT_PER_15_MIN = Number(process.env.LIMIT_PER_15_MIN || 80);

// Memory settings
const MAX_TURNS = Number(process.env.MAX_TURNS || 8);

// Model
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.1-8b-instant"; 
// بدائل قوية:
// "llama-3.1-70b-versatile"
// "mixtral-8x7b-32768" (لو متاح عندك)

if (!GROQ_API_KEY) {
  console.error("❌ GROQ_API_KEY missing in env vars");
  process.exit(1);
}

// ====== Middleware ======
app.use(express.json({ limit: "1mb" }));
app.use(
  cors({
    origin: FRONTEND_ORIGIN === "*" ? true : FRONTEND_ORIGIN,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: LIMIT_PER_15_MIN,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/", limiter);

// ====== In-memory sessions ======
const sessions = new Map();

function pushTurn(sessionId, role, text) {
  if (!sessions.has(sessionId)) sessions.set(sessionId, []);
  const arr = sessions.get(sessionId);
  arr.push({ role, text, at: Date.now() });

  const maxMessages = MAX_TURNS * 2;
  if (arr.length > maxMessages) {
    sessions.set(sessionId, arr.slice(arr.length - maxMessages));
  }
}

function getHistory(sessionId) {
  const arr = sessions.get(sessionId) || [];
  // OpenAI-compatible roles: user | assistant
  return arr.map((m) => ({
    role: m.role === "model" ? "assistant" : "user",
    content: m.text,
  }));
}

function safeJsonParse(str) {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

function systemPrompt(mode = "triage") {
  const base = `
You are "Moaeen", a bilingual Arabic/English assistant.
Return ONLY valid JSON (no markdown, no extra text).
Schema:
{
  "reply_ar": "Arabic reply in Egyptian tone, clear & respectful",
  "reply_en": "English reply, clear & professional",
  "triage": {
    "level": "green|yellow|red",
    "reason_ar": "سبب مختصر بالعربي",
    "reason_en": "Short reason in English",
    "next_questions_ar": ["..."],
    "next_questions_en": ["..."],
    "urgent_actions_ar": ["..."],
    "urgent_actions_en": ["..."]
  }
}

Rules:
- If emergency symptoms (chest pain, severe breathing difficulty, fainting, severe bleeding, stroke signs) => level="red" + urgent actions.
- If medical but not emergency => "yellow".
- If safe/self-care => "green".
- Ask 2-4 clarifying questions when needed.
- Do NOT claim you are a doctor.
`;

  if (mode === "general") {
    return base + `For non-medical questions set triage.level="green".`;
  }
  return base;
}

// ✅ Groq OpenAI-compatible request with retry
async function groqChat({ messages, model }) {
  const url = "https://api.groq.com/openai/v1/chat/completions";

  // Retry بسيط لو حصل ضغط/فشل مؤقت
  const attempts = 3;

  for (let i = 1; i <= attempts; i++) {
    try {
      const r = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.7,
          max_tokens: 800,
        }),
      });

      const data = await r.json().catch(() => null);

      if (!r.ok) {
        // لو Rate limit أو ضغط، جرّب تاني
        const msg = data?.error?.message || `HTTP ${r.status}`;
        if ((r.status === 429 || r.status >= 500) && i < attempts) {
          await new Promise((res) => setTimeout(res, 700 * i));
          continue;
        }
        throw new Error(msg);
      }

      const text = data?.choices?.[0]?.message?.content || "";
      return text;
    } catch (e) {
      if (i === attempts) throw e;
      await new Promise((res) => setTimeout(res, 700 * i));
    }
  }
}

// ====== Routes ======
app.get("/health", (req, res) => {
  res.json({
    ok: true,
    service: "Moaeen-Triage",
    model: GROQ_MODEL,
    time: new Date().toISOString(),
  });
});

app.post("/api/chat", async (req, res) => {
  const { message, sessionId, mode } = req.body || {};

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "message is required" });
  }

  const sid = sessionId && typeof sessionId === "string" ? sessionId : uuidv4();

  try {
    pushTurn(sid, "user", message);

    const history = getHistory(sid);

    // ✅ system + history + current user
    const messages = [
      { role: "system", content: systemPrompt(mode || "triage") },
      ...history,
      { role: "user", content: message },
    ];

    const raw = await groqChat({ messages, model: GROQ_MODEL });

    pushTurn(sid, "model", raw);

    const parsed = safeJsonParse(raw);

    // لو الموديل ما التزمش بـ JSON: نخليه يرجع JSON مضمون
    if (!parsed) {
      return res.status(200).json({
        sessionId: sid,
        reply_ar:
          "في مشكلة بسيطة في تنسيق ردّ الذكاء الاصطناعي. جرّب تاني بنفس السؤال.",
        reply_en:
          "There was a minor formatting issue in the AI response. Please try again.",
        triage: {
          level: "green",
          reason_ar: "مشكلة تقنية مؤقتة",
          reason_en: "Temporary technical issue",
          next_questions_ar: [],
          next_questions_en: [],
          urgent_actions_ar: [],
          urgent_actions_en: [],
        },
        raw,
      });
    }

    return res.status(200).json({ sessionId: sid, ...parsed });
  } catch (err) {
    console.error("❌ /api/chat error:", err?.message || err);

    // ✅ هنا بدل ما يظهر Error خام للمستخدم: رسالة محترمة + تفاصيل للتشخيص
    return res.status(200).json({
      sessionId: sid,
      reply_ar:
        "حصلت مشكلة مؤقتة في الاتصال بالذكاء الاصطناعي. جرّب بعد دقيقة، ولو استمرت ابعتلي لقطة من (Railway Logs).",
      reply_en:
        "Temporary AI connection issue. Try again in a minute. If it persists, send me a screenshot from Railway Logs.",
      triage: {
        level: "green",
        reason_ar: "اتصال/مزود AI مؤقت",
        reason_en: "Temporary AI provider issue",
        next_questions_ar: [],
        next_questions_en: [],
        urgent_actions_ar: [],
        urgent_actions_en: [],
      },
      _error: String(err?.message || err),
      _model: GROQ_MODEL,
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
