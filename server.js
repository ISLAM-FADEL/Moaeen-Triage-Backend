import express from "express";

const app = express();
app.use(express.json({ limit: "1mb" }));

// --------- Minimal CORS (GitHub Pages -> Railway) ----------
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

// --------- Config ----------
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("Missing GEMINI_API_KEY env var");
  process.exit(1);
}

const PORT = process.env.PORT || 3000;
const LIMIT_PER_DAY = Number(process.env.LIMIT_PER_DAY || 30);

// Gemini OpenAI-compatible endpoint base
const GEMINI_BASE_URL =
  process.env.GEMINI_BASE_URL || "https://generativelanguage.googleapis.com/v1beta/openai";
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3-flash-preview";

// --------- Simple per-IP rate limit (per day) ----------
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

// --------- Strict safety shortcut ----------
function detectCritical(text = "") {
  const t = String(text).toLowerCase();
  const bad = [
    "انتحار","اموت","هقتل نفسي","اذي نفسي","مش عايز اعيش","عايز أموت",
    "suicide","kill myself","self harm","end my life"
  ];
  return bad.some(k => t.includes(k));
}

// --------- In-memory session memory (simple) ----------
const sessions = new Map(); // sessionId -> {messages, ts}
const MAX_TURNS = Number(process.env.MAX_TURNS || 16);
const SESSION_TTL_MS = Number(process.env.SESSION_TTL_MS || 24 * 60 * 60 * 1000);

function trimHistory(arr) {
  const msgs = (Array.isArray(arr) ? arr : []).filter(
    m => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string"
  );
  return msgs.slice(-MAX_TURNS);
}

function cleanOldSessions() {
  const now = Date.now();
  for (const [sid, s] of sessions.entries()) {
    if (!s?.ts || (now - s.ts) > SESSION_TTL_MS) sessions.delete(sid);
  }
}
setInterval(cleanOldSessions, 10 * 60 * 1000).unref?.();

// --------- Gemini call (OpenAI-compatible Chat Completions) ----------
async function geminiChatCompletions({ model, messages, temperature = 0.7, max_tokens = 900 }) {
  const url = `${GEMINI_BASE_URL}/chat/completions`;

  const r = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Gemini OpenAI-compat REST uses Bearer API key per docs
      "Authorization": `Bearer ${GEMINI_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
      max_tokens,
    }),
  });

  if (!r.ok) {
    const detail = await r.text();
    const err = new Error("Gemini error");
    err.status = r.status;
    err.detail = detail;
    throw err;
  }

  const data = await r.json();
  const reply = data?.choices?.[0]?.message?.content ?? "";
  return { data, reply };
}

app.get("/health", (req, res) => res.json({ ok: true, provider: "gemini", model: GEMINI_MODEL }));

// ------------------- /api/chat (ChatGPT-like) -------------------
// body: { sessionId, message, lang: "ar"|"en", mode: "support"|"plan" }
app.post("/api/chat", rateLimit, async (req, res) => {
  try {
    const { sessionId, message, lang = "ar", mode = "support" } = req.body || {};

    if (!sessionId || String(sessionId).trim().length < 6) {
      return res.status(400).json({ error: "sessionId required" });
    }
    if (!message || String(message).trim().length < 2) {
      return res.status(400).json({ error: "message too short" });
    }

    const userText = String(message).trim();

    if (detectCritical(userText)) {
      const replyAr =
        "أنا قلقان عليك بجد. لو في خطر فوري: اتصل بالطوارئ أو روح أقرب مستشفى دلوقتي، " +
        "وكلم شخص موثوق حالًا ومتقعدش لوحدك. انت في أمان دلوقتي؟";
      const replyEn =
        "I’m really concerned about your safety. If you’re in immediate danger, contact emergency services or go to the nearest hospital now, " +
        "and call someone you trust right away. Are you safe right now?";

      const cur = sessions.get(sessionId) || { messages: [], ts: Date.now() };
      cur.messages = trimHistory([
        ...cur.messages,
        { role: "user", content: userText },
        { role: "assistant", content: (lang === "en" ? replyEn : replyAr) },
      ]);
      cur.ts = Date.now();
      sessions.set(sessionId, cur);

      return res.json({ reply: (lang === "en" ? replyEn : replyAr), safety_level: "high", mode });
    }

    const system_ar = `أنت "مُعِين" شات دعم نفسي ذكي (تعليمي، مش تشخيص).
أسلوبك: مصري بسيط، هادي، محترم، داعم.
ممنوع طلب بيانات حساسة. ممنوع وصف أدوية. لو الحالة خطرة وجّه لطوارئ.
في آخر الرد اسأل سؤال متابعة واحد فقط.

الوضع:
- support: تعاطف + تهدئة + تنظيم الأفكار.
- plan: خطوات عملية صغيرة + خطة اليوم/بكرة.`;

    const system_en = `You are "Moaeen", a supportive mental wellness chat assistant (educational, not medical diagnosis).
No sensitive data. No meds. If risk appears, provide crisis guidance.
Ask ONE follow-up question at the end.
Modes: support (empathy), plan (small actionable steps).`;

    const modeHintAr = mode === "plan"
      ? "ركز على خطوات عملية صغيرة وخطة واضحة."
      : "ركز على الدعم والتهدئة.";

    const modeHintEn = mode === "plan"
      ? "Focus on a small actionable plan."
      : "Focus on emotional support.";

    const cur = sessions.get(sessionId) || { messages: [], ts: Date.now() };
    const history = trimHistory(cur.messages);

    const messages = [
      { role: "system", content: (lang === "en" ? system_en : system_ar) },
      ...history,
      {
        role: "user",
        content: `${lang === "en" ? "Note:" : "ملاحظة:"} ${lang === "en" ? modeHintEn : modeHintAr}\n\n${userText}`,
      },
    ];

    const { reply } = await geminiChatCompletions({
      model: GEMINI_MODEL,
      messages,
      temperature: 0.75,
      max_tokens: 900,
    });

    const newHistory = trimHistory([...history, { role: "user", content: userText }, { role: "assistant", content: reply }]);
    sessions.set(sessionId, { messages: newHistory, ts: Date.now() });

    return res.json({ reply, safety_level: "low", mode, provider: "gemini", model: GEMINI_MODEL });
  } catch (e) {
    return res.status(e.status || 500).json({ error: e.message, detail: e.detail });
  }
});

// ------------------- /api/triage (structured JSON) -------------------
app.post("/api/triage", rateLimit, async (req, res) => {
  try {
    const { text, lang = "ar" } = req.body || {};
    if (!text || String(text).trim().length < 5) {
      return res.status(400).json({ error: "Text too short" });
    }

    if (detectCritical(String(text))) {
      return res.json({
        safety_level: "high",
        domain: "unclear",
        confidence: 0,
        summary: lang === "ar" ? "الكلام فيه مؤشرات خطر واحتياج لدعم فوري." : "Risk indicators; urgent support needed.",
        advice: [
          lang === "ar"
            ? "لو في خطر فوري: اطلب طوارئ/روح أقرب مستشفى، وكلم شخص موثوق حالًا."
            : "If in immediate danger: contact local emergency services / go to the nearest hospital, and call someone you trust now."
        ],
        followups: [],
        suggested_test: "FULL"
      });
    }

    const system_ar = `أخرج JSON فقط:
{
 "safety_level":"low|medium|high",
 "domain":"depression|anxiety|ocd|trauma|unclear",
 "confidence":0-100,
 "summary":"جملة قصيرة",
 "advice":[5 نصائح قصيرة عملية واحدة منها لمسة إيمانية لطيفة],
 "followups":[3 أسئلة نعم/لا],
 "suggested_test":"PHQ-9|GAD-7|OCD|PTSD|FULL"
}
(تعليمي وليس تشخيصًا)`;

    const system_en = `Return ONLY JSON:
{
 "safety_level":"low|medium|high",
 "domain":"depression|anxiety|ocd|trauma|unclear",
 "confidence":0-100,
 "summary":"short",
 "advice":[5 practical tips (one gentle faith-based optional line)],
 "followups":[3 yes/no questions],
 "suggested_test":"PHQ-9|GAD-7|OCD|PTSD|FULL"
}
(Educational, not diagnosis)`;

    const messages = [
      { role: "system", content: (lang === "en" ? system_en : system_ar) },
      { role: "user", content: String(text) },
    ];

    const { reply } = await geminiChatCompletions({
      model: GEMINI_MODEL,
      messages,
      temperature: 0.2,
      max_tokens: 700,
    });

    let parsed;
    try { parsed = JSON.parse(reply); }
    catch { parsed = { error: "Bad JSON", raw: reply }; }

    return res.json(parsed);
  } catch (e) {
    return res.status(e.status || 500).json({ error: e.message, detail: e.detail });
  }
});

app.listen(PORT, () => console.log("Moaeen backend running on port", PORT));
