import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Moaeen Triage Backend - Gemini version
 * - Node 18+ (fetch built-in)
 * - Railway compatible (uses process.env.PORT)
 */

const app = express();

// ====== Middlewares ======
app.use(express.json({ limit: "1mb" }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight explicitly (safe)
app.options("*", (_, res) => res.sendStatus(204));

// ====== ENV ======
const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// IMPORTANT: do not crash immediately if missing key in Railway build phase,
// but we will block /api/chat with a clear error.
if (!GEMINI_API_KEY) {
  console.warn("⚠️ GEMINI_API_KEY is missing (Railway Variables). /api/chat will not work.");
}

// ====== Gemini Client ======
const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;

// ====== Simple Rate Limit (in-memory) ======
// You can control daily limits from Railway variables if you like.
const LIMIT_PER_MIN = Number(process.env.LIMIT_PER_MIN || 30);
const ipBuckets = new Map();

/**
 * Basic per-IP per-minute limiter
 */
function rateLimit(req, res, next) {
  const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket.remoteAddress || "unknown";
  const now = Date.now();
  const windowMs = 60_000;

  const bucket = ipBuckets.get(ip) || { count: 0, start: now };

  // reset window
  if (now - bucket.start > windowMs) {
    bucket.count = 0;
    bucket.start = now;
  }

  bucket.count += 1;
  ipBuckets.set(ip, bucket);

  if (bucket.count > LIMIT_PER_MIN) {
    return res.status(429).json({
      ok: false,
      error: "Too many requests. Please slow down.",
      details: { limitPerMinute: LIMIT_PER_MIN },
    });
  }

  next();
}

// ====== Routes ======
app.get("/health", (req, res) => {
  res.json({
    ok: true,
    service: "moaeen-triage-backend",
    provider: "gemini",
    hasKey: Boolean(GEMINI_API_KEY),
    time: new Date().toISOString(),
  });
});

/**
 * POST /api/chat
 * body: { message: string, lang?: "ar"|"en", history?: [{role:"user"|"assistant", content:string}] }
 */
app.post("/api/chat", rateLimit, async (req, res) => {
  try {
    if (!GEMINI_API_KEY || !genAI) {
      return res.status(500).json({
        ok: false,
        error: "GEMINI_API_KEY missing",
        details: "Set GEMINI_API_KEY in Railway -> Project -> Variables",
      });
    }

    const { message, lang = "ar", history = [] } = req.body || {};

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ ok: false, error: "message is required" });
    }

    // Choose a stable model. You can change it later if you want.
    // "gemini-1.5-flash" is fast and cheap; "gemini-1.5-pro" is stronger.
    const modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash";
    const model = genAI.getGenerativeModel({ model: modelName });

    // System prompt (bilingual behavior)
    const systemPrompt =
      lang === "en"
        ? `You are Moaeen assistant. Be helpful, clear, and safe. Ask brief follow-up questions only when necessary.`
        : `أنت مساعد "مُعين". رد بإجابات واضحة وبسيطة وبلهجة مصرية لطيفة. لو محتاج توضيح اسأل سؤال واحد بس.`;

    // Build conversation text (simple + reliable)
    const historyText = Array.isArray(history)
      ? history
          .slice(-12)
          .map((h) => {
            const r = h?.role === "assistant" ? "Assistant" : "User";
            const c = typeof h?.content === "string" ? h.content : "";
            return `${r}: ${c}`;
          })
          .join("\n")
      : "";

    const prompt = `
SYSTEM: ${systemPrompt}

${historyText ? `CHAT HISTORY:\n${historyText}\n` : ""}

User: ${message}
Assistant:
`.trim();

    const result = await model.generateContent(prompt);
    const reply = result?.response?.text?.() || "";

    return res.json({
      ok: true,
      provider: "gemini",
      model: modelName,
      reply,
    });
  } catch (err) {
    console.error("❌ /api/chat error:", err);
    return res.status(500).json({
      ok: false,
      error: "Gemini error",
      details: err?.message || String(err),
    });
  }
});

// ====== Start server ======
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
