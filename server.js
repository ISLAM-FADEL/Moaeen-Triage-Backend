import express from "express";

const app = express();
app.use(express.json({ limit: "1mb" }));

// =====================
// ✅ FIX CORS (Preflight)
// =====================
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  // Reply to preflight requests
  if (req.method === "OPTIONS") return res.sendStatus(204);

  next();
});

// =====================
// Config
// =====================
const PORT = process.env.PORT || 3000;

// Gemini key (Railway Variables)
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("❌ Missing GEMINI_API_KEY env var");
  process.exit(1);
}

// Optional limits
const LIMIT_PER_DAY = Number(process.env.LIMIT_PER_DAY || 30);
const CACHE_TTL_MS = Number(process.env.CACHE_TTL_MS || 6 * 60 * 60 * 1000); // 6h

// =====================
// Simple per-IP rate limit (daily)
// =====================
const hits = new Map(); // ip -> {count, day}

function todayKey() {
  const d = new Date();
  return `${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()}`;
}

function getIP(req) {
  const xf = req.headers["x-forwarded-for"];
  if (typeof xf === "string" && xf.length) return xf.split(",")[0].trim();
  return req.socket.remoteAddress || "unknown";
}

function rateLimit(req, res, next) {
  const ip = getIP(req);
  const day = todayKey();
  const item = hits.get(ip);

  if (!item || item.day !== day) {
    hits.set(ip, { count: 1, day });
    return next();
  }
  if (item.count >= LIMIT_PER_DAY) {
    return res.status(429).json({ error: "Rate limit reached", limit: LIMIT_PER_DAY });
  }
  item.count += 1;
  return next();
}

// =====================
// Cache (reduce cost)
// =====================
const cache = new Map(); // key -> {ts, data}

function cacheKey(sessionId, message, lang) {
  return `${String(lang)}::${String(sessionId)}::${String(message).trim().slice(0, 1500)}`;
}

function getCache(key) {
  const c = cache.get(key);
  if (!c) return null;
  if (Date.now() - c.ts > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  return c.data;
}

function setCache(key, data) {
  cache.set(key, { ts: Date.now(), data });
}

// =====================
// Safety shortcut (self-harm keywords)
// =====================
function detectCritical(text = "") {
  const t = text.toLowerCase();
  const bad = [
    "انتحار", "هموت", "هقتل نفسي", "اذي نفسي", "مش عايز اعيش",
    "suicide", "kill myself", "self harm"
  ];
  return bad.some(k => t.includes(k));
}

// =====================
// Gemini call helper (REST)
// =====================
async function callGemini({ message, lang = "ar" }) {
  // model can be changed if you want
  const model = "gemini-1.5-flash";

  const system_ar = `
أنت "مُعِين" — مساعد داخل موقع دعم نفسي (تعليمي) وليس تشخيص طبي.
أسلوبك: مصري بسيط، هادي، محترم. لمسة دينية خفيفة بدون وعظ.
قواعد أمان: لا تشخيص نهائي، لا تطلب بيانات حساسة.
لو في خطر (إيذاء نفس/انتحار): ادّي إرشاد طوارئ فورًا.
المطلوب: رد مختصر + خطوات عملية + سؤال/سؤالين متابعة.
واكتب عربي + إنجليزي لو المستخدم طلب الاثنين.
`;

  const system_en = `
You are "Moaeen" in a mental wellness website (educational, not medical diagnosis).
Be calm, practical, safe. Do not request sensitive info.
If self-harm risk appears: give urgent crisis guidance.
Return a helpful short reply + practical steps + 1-2 follow-up questions.
If user wants Arabic + English, include both.
`;

  const system = lang === "ar" ? system_ar : system_en;

  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`;

  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: `${system}\n\nUser message:\n${message}` }]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 500
    }
  };

  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const data = await r.json();
  if (!r.ok) {
    const msg = data?.error?.message || "Gemini API error";
    throw new Error(msg);
  }

  const text =
    data?.candidates?.[0]?.content?.parts?.map(p => p.text).join("") ||
    "No response";

  return text;
}

// =====================
// Routes
// =====================
app.get("/health", (req, res) => res.json({ ok: true }));

/**
 * POST /api/chat
 * body: { message: string, lang?: "ar"|"en", sessionId?: string }
 */
app.post("/api/chat", rateLimit, async (req, res) => {
  try {
    const { message, lang = "ar", sessionId = "default" } = req.body || {};

    if (!message || String(message).trim().length < 2) {
      return res.status(400).json({ error: "message is required" });
    }

    // Safety fast path
    if (detectCritical(String(message))) {
      return res.json({
        ok: true,
        safety_level: "high",
        reply_ar:
          "أنا حاسس إن الكلام فيه خطورة. لو في خطر فوري: كلم الإسعاف/الطوارئ فورًا أو روح أقرب مستشفى، وكلم شخص قريب منك حالًا. لو تقدر قولّي: هل أنت في أمان دلوقتي؟",
        reply_en:
          "This sounds serious. If you’re in immediate danger, contact local emergency services / go to the nearest hospital and call someone you trust now. Are you safe right now?"
      });
    }

    // Cache
    const ck = cacheKey(sessionId, message, lang);
    const cached = getCache(ck);
    if (cached) {
      return res.json({ ok: true, cached: true, ...cached });
    }

    const reply = await callGemini({ message: String(message), lang: String(lang) });

    // If user wants both languages we can keep it simple:
    // The prompt already says to return Arabic+English when needed.
    const out = { reply };

    setCache(ck, out);
    return res.json({ ok: true, cached: false, ...out });
  } catch (e) {
    return res.status(500).json({ error: "Server error", detail: e.message });
  }
});

// =====================
app.listen(PORT, () => console.log("✅ Moaeen backend running on port", PORT));
