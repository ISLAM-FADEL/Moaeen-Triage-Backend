// server.js (ESM) - Moaeen Triage Backend using Groq (OpenAI-compatible)

import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { v4 as uuidv4 } from "uuid";

const app = express();

/**
 * IMPORTANT for Railway/Proxies:
 * Fixes express-rate-limit error: ERR_ERL_UNEXPECTED_X_FORWARDED_FOR
 */
app.set("trust proxy", 1);

// =====================
// Config
// =====================
const PORT = Number(process.env.PORT || 3000);

// Groq
const GROQ_API_KEY = process.env.GROQ_API_KEY || "";
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.1-8b-instant"; // ✅ correct default

// Frontend origin (GitHub Pages etc.)
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "*";

// Rate limit
const LIMIT_PER_15_MIN = Number(process.env.LIMIT_PER_15_MIN || 60);

// Memory
const MAX_TURNS = Number(process.env.MAX_TURNS || 8); // last N turns
const MAX_INPUT_CHARS = Number(process.env.MAX_INPUT_CHARS || 4000); // protect server

if (!GROQ_API_KEY) {
  console.error("❌ GROQ_API_KEY missing in env vars");
  process.exit(1);
}

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

// Serve frontend if you place index.html in /public
app.use(express.static("public"));

// Rate limiter (protect against spam)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: LIMIT_PER_15_MIN,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.ip, // works with trust proxy
});
app.use("/api/", limiter);

// =====================
// In-memory sessions
// =====================
/**
 * sessions = Map<sessionId, Array<{role:"user"|"assistant", text:string, at:number}>>
 */
const sessions = new Map();

function pushTurn(sessionId, role, text) {
  if (!sessions.has(sessionId)) sessions.set(sessionId, []);
  const arr = sessions.get(sessionId);

  arr.push({ role, text, at: Date.now() });

  const maxMessages = MAX_TURNS * 2; // user+assistant pairs
  if (arr.length > maxMessages) {
    sessions.set(sessionId, arr.slice(arr.length - maxMessages));
  }
}

function getHistoryForGroq(sessionId) {
  const arr = sessions.get(sessionId) || [];
  // Groq OpenAI-compatible format:
  // [{role:"system"|"user"|"assistant", content:"..."}]
  return arr.map((m) => ({
    role: m.role,
    content: m.text,
  }));
}

// =====================
// Helpers
// =====================
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
`.trim();

  if (mode === "general") {
    return (
      base +
      `

For general questions not medical, set triage.level="green" and keep triage reasons generic.`
    );
  }

  return base;
}

function truncateInput(s) {
  const t = String(s || "");
  if (t.length <= MAX_INPUT_CHARS) return t;
  return t.slice(0, MAX_INPUT_CHARS);
}

async function groqChatCompletion({ messages, temperature = 0.7, max_tokens = 700 }) {
  // Groq is OpenAI-compatible:
  // POST https://api.groq.com/openai/v1/chat/completions
  const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages,
      temperature,
      max_tokens,
    }),
  });

  const data = await resp.json().catch(() => null);

  if (!resp.ok) {
    const msg =
      (data && (data.error?.message || data.message)) ||
      `Groq API error (${resp.status})`;
    const detail = data ? JSON.stringify(data).slice(0, 2000) : "";
    throw new Error(`${msg}${detail ? " | " + detail : ""}`);
  }

  const text = data?.choices?.[0]?.message?.content ?? "";
  return text;
}

// =====================
// Routes
// =====================
app.get("/health", (req, res) => {
  res.json({
    ok: true,
    service: "Moaeen-Triage",
    provider: "groq",
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
  const userText = truncateInput(message);

  console.log("✅ /api/chat", { sid, len: userText.length, mode: mode || "triage" });

  try {
    // Add user message to memory
    pushTurn(sid, "user", userText);

    const systemPrompt = buildSystemPrompt(mode || "triage");

    const messages = [
      { role: "system", content: systemPrompt },
      ...getHistoryForGroq(sid),
      // IMPORTANT: We already pushed user message into history,
      // but to avoid duplicate we can either:
      // (A) not push first then include here,
      // or (B) push then build history includes it already.
      // Current getHistoryForGroq includes the last push, so we DO NOT add again.
    ];

    const text = await groqChatCompletion({
      messages,
      temperature: 0.7,
      max_tokens: 700,
    });

    // Save assistant reply
    pushTurn(sid, "assistant", text);

    const parsed = safeJsonParse(text);

    if (!parsed) {
      // If model didn't return valid JSON, return a safe response
      return res.status(200).json({
        sessionId: sid,
        reply_ar: "حصلت مشكلة بسيطة في تنسيق رد الذكاء الاصطناعي. جرّب تاني بنفس السؤال.",
        reply_en: "There was a formatting issue in the AI response. Please try again.",
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

// SPA fallback (if you have /public/index.html)
app.get("*", (req, res) => {
  res.sendFile(process.cwd() + "/public/index.html");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🤖 Provider: groq | Model: ${GROQ_MODEL}`);
});
