import express from "express";

const app = express();
app.use(express.json({ limit: "1mb" }));

// --------- Minimal CORS (GitHub Pages / any frontend -> Railway) ----------
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // بعدين نضيّقها بالدومين بتاعك
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

// --------- Config ----------
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  console.error("Missing OPENAI_API_KEY env var");
  process.exit(1);
}

const PORT = process.env.PORT || 3000;
const LIMIT_PER_DAY = Number(process.env.LIMIT_PER_DAY || 50);
const CACHE_TTL_MS = Number(process.env.CACHE_TTL_MS || 10 * 60 * 1000); // 10 min
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

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

// --------- Very small cache to reduce cost ----------
const cache = new Map(); // key -> {ts, data}
function setCache(key, data) {
  cache.set(key, { ts: Date.now(), data });
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

// --------- Safety shortcut ----------
function detectCritical(text = "") {
  const t = String(text).toLowerCase();
  const bad = [
    "انتحار","اموت","هقتل نفسي","اذي نفسي","مش عايز اعيش","عايز أموت",
    "suicide","kill myself","self harm","end my life"
  ];
  return bad.some(k => t.includes(k));
}

// --------- In-memory "chat sessions" (simple memory) ----------
// NOTE: Railway ممكن يعمل restart أحيانًا => الميموري بتتصفر.
// ده طبيعي. بعدين نعمله DB لو حبيت.
const sessions = new Map(); // sessionId -> {messages: [{role, content}], updatedAt}
const MAX_TURNS = 16; // آخر كام رسالة نحتفظ بيهم

function normalizeLang(lang) {
  const l = String(lang || "").toLowerCase();
  if (l.startsWith("en")) return "en";
  return "ar"; // default
}

function buildSystemPrompt(lang) {
  if (lang === "en") {
    return `You are "Moaeen" — a supportive AI assistant inside a mental wellness self-assessment app (not medical diagnosis).
Style: calm, practical, friendly. Never claim to be a doctor. No sensitive data requests.
If user shows self-harm/suicide intent: respond with urgent safety guidance and encourage contacting local emergency services and trusted people.
Be bilingual if the user mixes languages.`;
  }
  return `أنت "مُعين" — مساعد ذكي داخل موقع دعم/تقييم ذاتي للصحة النفسية (مش تشخيص طبي).
أسلوبك: مصري بسيط، هادي، عملي. من غير طلب بيانات حساسة.
لو ظهرت نية إيذاء نفس/انتحار: ادي إرشاد طوارئ فورًا (يتواصل مع الطوارئ/أقرب مستشفى + شخص موثوق).
لو المستخدم خلط عربي/إنجليزي رد عليه بنفس اللغة أو خلي الرد ثنائي.`;
}

function getSession(sessionId) {
  const id = String(sessionId || "").trim();
  if (!id) return null;
  return sessions.get(id) || null;
}

function upsertSession(sessionId, messages) {
  const id = String(sessionId || "").trim();
  if (!id) return;
  sessions.set(id, { messages, updatedAt: Date.now() });
}

// --------- Health ----------
app.get("/health", (req, res) => res.json({ ok: true }));

// --------- CHAT (Like ChatGPT) ----------
// Request body:
// {
//   "sessionId": "abc123",         // optional but recommended
//   "message": "hello",            // required (or send messages array)
//   "messages": [{role:"user", content:"..."}], // optional (if you want to control history from frontend)
//   "lang": "ar" | "en"            // optional
// }
app.post("/api/chat", rateLimit, async (req, res) => {
  try {
    const { sessionId, message, messages, lang } = req.body || {};
    const L = normalizeLang(lang);

    // Safety immediate
    const incomingText = message ?? (Array.isArray(messages) && messages.length ? messages[messages.length - 1]?.content : "");
    if (detectCritical(incomingText)) {
      const ar = {
        ok: true,
        safety_level: "high",
        reply:
          "أنا قلقان عليك. لو في خطر فوري أو نية لإيذاء نفسك: من فضلك اتصل بالطوارئ فورًا أو روح أقرب مستشفى، وكلم شخص قريب منك حالًا. لو تحب، قولّي: هل أنت لوحدك دلوقتي؟",
      };
      const en = {
        ok: true,
        safety_level: "high",
        reply:
          "I’m concerned about your safety. If you’re in immediate danger or thinking of harming yourself: please contact local emergency services now or go to the nearest hospital, and call someone you trust right away. Are you alone right now?",
      };
      return res.json(L === "en" ? en : ar);
    }

    // Build history
    let history = [];

    // If frontend sends its own history, use it
    if (Array.isArray(messages) && messages.length) {
      history = messages
        .filter(m => m && typeof m.role === "string" && typeof m.content === "string")
        .map(m => ({ role: m.role, content: m.content }));
    } else {
      // Else use session memory
      const s = getSession(sessionId);
      if (s?.messages?.length) history = s.messages.slice();
      if (typeof message === "string" && message.trim()) {
        history.push({ role: "user", content: message.trim() });
      }
    }

    if (!history.length) {
      return res.status(400).json({ error: "No message provided. Send {message} or {messages[]}." });
    }

    // Keep last turns
    const trimmed = history.slice(-MAX_TURNS);

    // Cache (light)
    const cacheKey = `${L}::${sessionId || "nosession"}::${trimmed.map(m => `${m.role}:${m.content}`).join("|").slice(0, 1500)}`;
    const cached = getCache(cacheKey);
    if (cached) {
      return res.json({ ok: true, cached: true, ...cached });
    }

    const system = buildSystemPrompt(L);

    // OpenAI Responses API payload
    const payload = {
      model: OPENAI_MODEL,
      input: [
        { role: "system", content: system },
        ...trimmed
      ],
    };

    const r = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const detail = await r.text();
      return res.status(500).json({ error: "OpenAI error", detail });
    }

    const data = await r.json();
    const reply = data.output_text || "";

    // Update session memory (append assistant reply)
    const newHistory = trimmed.concat([{ role: "assistant", content: reply }]);
    if (sessionId) upsertSession(sessionId, newHistory.slice(-MAX_TURNS));

    const response = {
      ok: true,
      sessionId: sessionId || null,
      reply,
      used_model: OPENAI_MODEL,
    };

    setCache(cacheKey, response);
    return res.json(response);
  } catch (e) {
    return res.status(500).json({ error: e?.message || "Server error" });
  }
});

// --------- Optional: keep your old triage endpoint (if you still use it) ----------
app.post("/api/triage", rateLimit, async (req, res) => {
  try {
    const { text, lang = "ar" } = req.body || {};
    const L = normalizeLang(lang);

    if (!text || String(text).trim().length < 5) {
      return res.status(400).json({ error: "Text too short" });
    }

    if (detectCritical(String(text))) {
      return res.json({
        safety_level: "high",
        domain: "unclear",
        confidence: 0,
        summary: L === "ar" ? "الكلام فيه مؤشرات خطر واحتياج لدعم فوري." : "Risk indicators; urgent support needed.",
        advice: [
          L === "ar"
            ? "لو في خطر فوري: اطلب طوارئ/روح أقرب مستشفى، وكلم شخص موثوق حالًا."
            : "If in immediate danger: contact local emergency services / go to the nearest hospital, and call someone you trust now.",
        ],
        followups: [],
        suggested_test: "FULL",
      });
    }

    const system_ar = `أنت "مُعِين" — مساعد داخل تطبيق تقييم ذاتي للصحة النفسية (تعليمي)، وليس تشخيصًا طبيًا.
أسلوبك: مصري بسيط، هادي، محترم. لمسة دينية خفيفة بدون وعظ أو فتاوى.
STRICT SAFETY: لا تشخيص نهائي، لا طلب بيانات حساسة. إن ظهرت مخاطر (إيذاء نفس/انتحار) ارفع safety_level وأعطِ إرشاد طوارئ.
أخرج JSON فقط وفق العقد:
{
 "safety_level":"low|medium|high",
 "domain":"depression|anxiety|ocd|trauma|unclear",
 "confidence":0-100,
 "summary":"جملة قصيرة",
 "advice":[5 نصائح قصيرة عملية واحدة منها لمسة إيمانية لطيفة],
 "followups":[3 أسئلة نعم/لا],
 "suggested_test":"PHQ-9|GAD-7|OCD|PTSD|FULL"
}`;

    const system_en = `You are "Moaeen" in a self-assessment mental wellness app (not medical diagnosis).
Be calm, practical, and safe. No sensitive data. If risk appears, give crisis guidance.
Return ONLY JSON:
{
 "safety_level":"low|medium|high",
 "domain":"depression|anxiety|ocd|trauma|unclear",
 "confidence":0-100,
 "summary":"short",
 "advice":[5 practical tips (one gentle faith-based optional line)],
 "followups":[3 yes/no questions],
 "suggested_test":"PHQ-9|GAD-7|OCD|PTSD|FULL"
}`;

    const payload = {
      model: OPENAI_MODEL,
      input: [
        { role: "system", content: (L === "ar" ? system_ar : system_en) },
        { role: "user", content: String(text) }
      ],
      text: { format: { type: "json_object" } }
    };

    const r = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const detail = await r.text();
      return res.status(500).json({ error: "OpenAI error", detail });
    }

    const data = await r.json();
    const out = data.output_text || "{}";

    let parsed;
    try { parsed = JSON.parse(out); }
    catch { parsed = { error: "Bad JSON", raw: out }; }

    return res.json(parsed);
  } catch (e) {
    return res.status(500).json({ error: e?.message || "Server error" });
  }
});

app.listen(PORT, () => console.log("Moaeen backend running on port", PORT));
