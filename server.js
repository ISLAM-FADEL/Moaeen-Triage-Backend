import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { v4 as uuidv4 } from "uuid";

const app = express();

// ====== Config ======
const PORT = process.env.PORT || 3000;

// ✅ Groq key
const GROQ_API_KEY = process.env.GROQ_API_KEY;

// اختياري: لو عندك فرونت على دومين تاني
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "*";

// Rate limit اختياري
const LIMIT_PER_15_MIN = Number(process.env.LIMIT_PER_15_MIN || 60);

// Memory settings
const MAX_TURNS = Number(process.env.MAX_TURNS || 8);

// ✅ Groq model (ممكن تسيبه افتراضي)
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.1-8b-instant";

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

// Serve frontend (لو عندك public)
app.use(express.static("public"));

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: LIMIT_PER_15_MIN,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/", limiter);

// ====== In-memory conversation store ======
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
  return arr.map((m) => ({
    role: m.role, // "user" | "assistant"
    content: m.text,
  }));
}

// ====== Helpers ======
function safeJsonParse(str) {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

function buildSystemPrompt(mode = "triage") {
  const base = `
You are "Moaeen", a bilingual Arabic/English assistant.
Return ONLY valid JSON (no markdown, no extra text).
The JSON schema:
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
- If medical emergency symptoms (chest pain, severe breathing difficulty, fainting, severe bleeding, stroke signs), set level="red" and give urgent actions.
- If medical but not emergency, use yellow.
- If safe/self-care, use green.
- Keep replies helpful, structured, and ask 2-4 clarifying questions when needed.
- Do NOT claim you are a doctor. Encourage professional care when needed.
`;

  if (mode === "general") {
    return (
      base +
      `
For general questions not medical, set triage.level="green" and keep triage reasons generic.`
    );
  }

  return base;
}

async function groqChatCompletion({ model, messages }) {
  const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 700,
      response_format: { type: "json_object" }, // ✅ يطلب JSON مضبوط
    }),
  });

  const data = await resp.json().catch(() => null);

  if (!resp.ok) {
    const msg =
      (data && (data.error?.message || data.message)) ||
      `HTTP ${resp.status}`;
    throw new Error(msg);
  }

  const text = data?.choices?.[0]?.message?.content || "";
  return text;
}

// ====== Routes ======
app.get("/health", (req, res) => {
  res.json({ ok: true, service: "Moaeen-Triage", time: new Date().toISOString() });
});

app.post("/api/chat", async (req, res) => {
  const { message, sessionId, mode } = req.body || {};

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "message is required" });
  }

  const sid = sessionId && typeof sessionId === "string" ? sessionId : uuidv4();

  console.log("✅ /api/chat", { sid, len: message.length, mode: mode || "triage" });

  try {
    // Add user message to memory
    pushTurn(sid, "user", message);

    const system = buildSystemPrompt(mode || "triage");

    const messages = [
      { role: "system", content: system },
      ...getHistory(sid),
      { role: "user", content: message },
    ];

    const text = await groqChatCompletion({
      model: GROQ_MODEL,
      messages,
    });

    // Save assistant reply
    pushTurn(sid, "assistant", text);

    const parsed = safeJsonParse(text);

    if (!parsed) {
      return res.status(200).json({
        sessionId: sid,
        reply_ar: "في مشكلة بسيطة في تنسيق الرد. جرّب تاني بنفس السؤال.",
        reply_en: "There was a minor formatting issue. Please try again.",
        raw: text,
      });
    }

    return res.status(200).json({ sessionId: sid, ...parsed });
  } catch (err) {
    console.error("❌ /api/chat error:", err?.message || err);
    return res.status(500).json({
      error: "AI error",
      detail: err?.message || String(err),
    });
  }
});

// SPA fallback
app.get("*", (req, res) => {
  res.sendFile(process.cwd() + "/public/index.html");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🤖 Provider: Groq | Model: ${GROQ_MODEL}`);
});
