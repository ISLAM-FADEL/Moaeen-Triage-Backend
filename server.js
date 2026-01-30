import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { v4 as uuidv4 } from "uuid";

const app = express();

// ====== Config ======
const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// اختياري: لو عندك فرونت على دومين تاني، حط FRONTEND_ORIGIN
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "*";

// Rate limit اختياري
const LIMIT_PER_15_MIN = Number(process.env.LIMIT_PER_15_MIN || 60);

// Memory settings
const MAX_TURNS = Number(process.env.MAX_TURNS || 8); // آخر كام رسالة تتخزن لكل session

if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY missing in env vars");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// ====== Middleware ======
app.use(express.json({ limit: "1mb" }));
app.use(
  cors({
    origin: FRONTEND_ORIGIN === "*" ? true : FRONTEND_ORIGIN,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Serve frontend
app.use(express.static("public"));

// Rate limiter (يحمي السيرفر من السبام)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  limit: LIMIT_PER_15_MIN,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/", limiter);

// ====== In-memory conversation store ======
/**
 * sessions = {
 *   [sessionId]: [{role: "user"|"model", text: "..."}, ...]
 * }
 */
const sessions = new Map();

function pushTurn(sessionId, role, text) {
  if (!sessions.has(sessionId)) sessions.set(sessionId, []);
  const arr = sessions.get(sessionId);
  arr.push({ role, text, at: Date.now() });

  // keep only last N*2 messages تقريباً
  const maxMessages = MAX_TURNS * 2;
  if (arr.length > maxMessages) {
    sessions.set(sessionId, arr.slice(arr.length - maxMessages));
  }
}

function getHistory(sessionId) {
  const arr = sessions.get(sessionId) || [];
  // Gemini history format:
  // [{ role: "user", parts: [{text:"..."}] }, { role:"model", parts:[{text:"..."}]}]
  return arr.map((m) => ({
    role: m.role,
    parts: [{ text: m.text }],
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
  // mode: triage | general
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

  // Log request
  console.log("✅ /api/chat", { sid, len: message.length, mode: mode || "triage" });

  try {
    const modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash";
    const modelObj = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: buildSystemPrompt(mode || "triage"),
    });

    // Add user message to memory
    pushTurn(sid, "user", message);

    const chat = modelObj.startChat({
      history: getHistory(sid),
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 700,
      },
    });

    const result = await chat.sendMessage(message);
    const text = result.response.text();

    // Add model response to memory
    pushTurn(sid, "model", text);

    const parsed = safeJsonParse(text);

    // لو Gemini رجع نص مش JSON مضبوط
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

// SPA fallback (لو فتحت أي مسار يرجّع index.html)
app.get("*", (req, res) => {
  res.sendFile(process.cwd() + "/public/index.html");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
