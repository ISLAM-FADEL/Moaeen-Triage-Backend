import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { v4 as uuidv4 } from "uuid";

const app = express();

// =====================
// Config
// =====================
const PORT = process.env.PORT || 3000;

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// حط دومين الفرونت هنا (GitHub Pages) أو سيبه "*" أثناء التجربة
// مثال: https://islam-fadel.github.io
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "*";

// Rate limit
const LIMIT_PER_15_MIN = Number(process.env.LIMIT_PER_15_MIN || 60);

// Memory
const MAX_TURNS = Number(process.env.MAX_TURNS || 8);

if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY missing in env vars");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// =====================
// Middleware
// =====================
app.use(express.json({ limit: "1mb" }));

app.use(
  cors({
    origin: FRONTEND_ORIGIN === "*" ? true : FRONTEND_ORIGIN,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// لو عندك فولدر public في نفس repo بتاع الباك اند
app.use(express.static("public"));

// rate limiter (متوافق مع نسخ مختلفة)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: LIMIT_PER_15_MIN,
  limit: LIMIT_PER_15_MIN,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/", limiter);

// =====================
// In-memory sessions
// =====================
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
    role: m.role,
    parts: [{ text: m.text }],
  }));
}

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
    return base + `
For general questions not medical, set triage.level="green" and keep triage reasons generic.`;
  }
  return base;
}

// =====================
// Gemini model fallback (حل مشكلة 404 Not Found)
// =====================
function getCandidateModels() {
  const envModel = (process.env.GEMINI_MODEL || "").trim();

  // جرّب موديلات شائعة — ولو واحد مش متاح هيعمل fallback للي بعده
  const candidates = [
    envModel,
    "gemini-2.0-flash",
    "gemini-2.0-flash-lite",
    "gemini-1.5-flash-latest",
    "gemini-1.5-pro-latest",
    "gemini-1.5-flash",
    "gemini-1.5-pro",
  ].filter(Boolean);

  // إزالة تكرارات
  return [...new Set(candidates)];
}

async function generateJsonReply({ sid, message, mode }) {
  const candidates = getCandidateModels();
  let lastErr = null;

  // history قبل ما نضيف رسالة المستخدم الحالية
  const history = getHistory(sid);

  for (const modelName of candidates) {
    try {
      const modelObj = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: buildSystemPrompt(mode || "triage"),
      });

      const chat = modelObj.startChat({
        history,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 700,
        },
      });

      const result = await chat.sendMessage(message);
      const text = result.response.text();

      // لازم JSON
      const parsed = safeJsonParse(text);
      if (parsed) return { ok: true, modelName, parsed, raw: text };

      // لو مش JSON: نحاول نصلّح مرة واحدة بطلب إعادة JSON فقط
      const fixPrompt =
        "Return ONLY valid JSON following the exact schema. No extra text.";
      const fix = await chat.sendMessage(fixPrompt);
      const fixedText = fix.response.text();
      const fixedParsed = safeJsonParse(fixedText);
      if (fixedParsed) return { ok: true, modelName, parsed: fixedParsed, raw: fixedText };

      // فشل parsing
      return { ok: false, modelName, error: "non_json", raw: text };
    } catch (e) {
      lastErr = e;

      const msg = String(e?.message || e);
      // لو Not Found/404 أو model not found نكمل fallback
      const isNotFound =
        msg.includes("404") ||
        msg.toLowerCase().includes("not found") ||
        msg.toLowerCase().includes("models/") ||
        msg.toLowerCase().includes("is not found");

      console.error(`❌ Model failed: ${modelName} ->`, msg);

      if (isNotFound) continue;
      // أي خطأ تاني نوقف ونرجع
      break;
    }
  }

  return { ok: false, error: "all_models_failed", detail: String(lastErr?.message || lastErr) };
}

// =====================
// Routes
// =====================
app.get("/health", (req, res) => {
  res.json({
    ok: true,
    service: "Moaeen-Triage",
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
    console.log("✅ /api/chat", { sid, len: message.length, mode: mode || "triage" });

    const out = await generateJsonReply({ sid, message, mode });

    // خزن الرسائل (بعد ما ننجح/نفشل)
    pushTurn(sid, "user", message);

    if (out.ok && out.parsed) {
      pushTurn(sid, "model", JSON.stringify(out.parsed));
      return res.status(200).json({ sessionId: sid, ...out.parsed, _model: out.modelName });
    }

    // لو رجع non_json أو فشل كله: رجّع رد آمن للمستخدم (من غير تفاصيل URL/Stack)
    return res.status(200).json({
      sessionId: sid,
      reply_ar: "حصلت مشكلة مؤقتة في رد الذكاء الاصطناعي. جرّب تاني بعد دقيقة.",
      reply_en: "Temporary AI issue. Please try again in a minute.",
      triage: {
        level: "green",
        reason_ar: "مشكلة تقنية مؤقتة",
        reason_en: "Temporary technical issue",
        next_questions_ar: [],
        next_questions_en: [],
        urgent_actions_ar: [],
        urgent_actions_en: [],
      },
      _error: out.error || "unknown",
      _model: out.modelName || null,
    });
  } catch (err) {
    console.error("❌ /api/chat fatal:", err?.message || err);
    return res.status(500).json({
      error: "server_error",
      detail: "Unexpected server error",
    });
  }
});

// SPA fallback (لو عندك public/index.html)
app.get("*", (req, res) => {
  res.sendFile(process.cwd() + "/public/index.html");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
