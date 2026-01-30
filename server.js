import express from "express";

const app = express();
app.use(express.json({ limit: "1mb" }));

// --------- CORS ----------
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

// --------- ENV ----------
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  console.error("Missing OPENAI_API_KEY env var");
  process.exit(1);
}
const PORT = process.env.PORT || 3000;

// --------- Rate limit (per IP / day) ----------
const LIMIT_PER_DAY = Number(process.env.LIMIT_PER_DAY || 30);
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

// --------- Cache (triage) ----------
const cache = new Map(); // key -> {ts, data}
const CACHE_TTL_MS = Number(process.env.CACHE_TTL_MS || 2 * 60 * 60 * 1000);
function cacheKey(text, lang) {
  return `${lang}::${text.trim().slice(0, 2000)}`;
}

// --------- Session memory (chat) ----------
const sessions = new Map(); // session_id -> {messages: [], ts}
const SESSION_TTL_MS = Number(process.env.SESSION_TTL_MS || 24 * 60 * 60 * 1000);
const MAX_TURNS = Number(process.env.MAX_TURNS || 12); // keep last 24 msgs

function cleanOldSessions() {
  const t = Date.now();
  for (const [sid, obj] of sessions.entries()) {
    if (!obj?.ts || (t - obj.ts) > SESSION_TTL_MS) sessions.delete(sid);
  }
}
setInterval(cleanOldSessions, 10 * 60 * 1000).unref?.();

function trimHistory(arr) {
  if (!Array.isArray(arr)) return [];
  const msgs = arr.filter(m => m && (m.role === "user" || m.role === "assistant"));
  return msgs.slice(-2 * MAX_TURNS);
}

// --------- Safety detection ----------
function detectCritical(text = "") {
  const t = String(text).toLowerCase();
  const bad = [
    "انتحار","هموت","عايز اموت","هقتل نفسي","اذي نفسي","مش عايز اعيش","بفكر انهي حياتي",
    "suicide","kill myself","self harm","end my life"
  ];
  return bad.some(k => t.includes(k));
}

app.get("/health", (req, res) => res.json({ ok: true }));

// ======================================================
//  /api/chat  (ChatGPT-like: multi-turn + memory session)
//  Request:
//   { session_id, message, mode: "support"|"plan", lang:"ar" }
//  Response:
//   { reply, safety_level, mode }
// ======================================================
app.post("/api/chat", rateLimit, async (req, res) => {
  try {
    const { session_id, message, mode = "support", lang = "ar" } = req.body || {};

    if (!session_id || String(session_id).trim().length < 6) {
      return res.status(400).json({ error: "session_id required" });
    }
    if (!message || String(message).trim().length < 2) {
      return res.status(400).json({ error: "message too short" });
    }

    const userText = String(message).trim();

    // Safety shortcut
    if (detectCritical(userText)) {
      const replyAr =
        "أنا قلقان عليك بجد. لو في خطر فوري: اتصل بالطوارئ أو روح أقرب مستشفى دلوقتي. " +
        "وكلم شخص قريب منك حالًا ومتقعدش لوحدك. انت في أمان دلوقتي؟";
      const replyEn =
        "I'm really concerned about your safety. If you're in immediate danger, contact emergency services or go to the nearest hospital now. " +
        "Please call someone you trust and don’t stay alone. Are you safe right now?";

      const cur = sessions.get(session_id) || { messages: [], ts: Date.now() };
      cur.messages = trimHistory([...cur.messages, { role: "user", content: userText }, { role: "assistant", content: lang === "ar" ? replyAr : replyEn }]);
      cur.ts = Date.now();
      sessions.set(session_id, cur);

      return res.json({ reply: lang === "ar" ? replyAr : replyEn, safety_level: "high", mode });
    }

    // Load memory
    const cur = sessions.get(session_id) || { messages: [], ts: Date.now() };
    const history = trimHistory(cur.messages);

    const system_ar = `أنت "مُعِين" شات دعم نفسي ذكي (تعليمي، مش تشخيص).
أسلوبك: مصري بسيط، هادي، محترم، داعم.
ممنوع طلب بيانات حساسة. ممنوع وصف أدوية أو تشخيص نهائي.
STRICT SAFETY: لو ظهر خطر إيذاء نفس/انتحار قدم إرشاد طوارئ.
اكتب ردود مفيدة وواضحة. وفي آخر الرد اسأل سؤال متابعة واحد فقط.

الوضع (mode):
- support: تعاطف + تهدئة + تنظيم الكلام.
- plan: خطوات عملية صغيرة + خطة اليوم/بكرة.`;

    const system_en = `You are "Moaeen", a supportive mental wellness chat assistant (educational, not medical diagnosis).
Calm, empathetic. No sensitive data. No meds. If risk appears, provide crisis guidance.
Ask ONE follow-up question at the end.
Modes: support (empathy), plan (practical steps + plan).`;

    const modeHintAr = mode === "plan"
      ? "ركز على خطوات عملية صغيرة وخطة واضحة."
      : "ركز على الدعم والتهدئة.";

    const modeHintEn = mode === "plan"
      ? "Focus on a small actionable plan."
      : "Focus on emotional support.";

    const payload = {
      model: "gpt-5.2",
      input: [
        { role: "system", content: (lang === "ar" ? system_ar : system_en) },
        ...history,
        { role: "user", content: `${lang === "ar" ? "ملاحظة:" : "Note:"} ${lang === "ar" ? modeHintAr : modeHintEn}\n\n${userText}` }
      ]
    };

    const r = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!r.ok) {
      const detail = await r.text();
      return res.status(500).json({ error: "OpenAI error", detail });
    }

    const data = await r.json();
    const reply = data.output_text || (lang === "ar" ? "معلش، ممكن تعيد صياغة كلامك؟" : "Sorry—can you rephrase?");

    // Save memory
    const newHistory = trimHistory([...history, { role: "user", content: userText }, { role: "assistant", content: reply }]);
    sessions.set(session_id, { messages: newHistory, ts: Date.now() });

    return res.json({ reply, safety_level: "low", mode });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// ======================================================
//  /api/triage (structured triage like before)
// ======================================================
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
            : "If in immediate danger: contact emergency services / go to the nearest hospital, and call someone you trust now."
        ],
        followups: [],
        suggested_test: "FULL"
      });
    }

    const ck = cacheKey(String(text), String(lang || "ar"));
    const c = cache.get(ck);
    if (c && (Date.now() - c.ts) < CACHE_TTL_MS) {
      return res.json({ ...c.data, cached: true });
    }

    const system_ar = `أنت "مُعِين" — مساعد داخل تطبيق تقييم ذاتي للصحة النفسية (تعليمي)، وليس تشخيصًا طبيًا.
أسلوبك: مصري بسيط، هادي، محترم. لمسة دينية خفيفة بدون وعظ أو فتاوى.
STRICT SAFETY: لا تشخيص نهائي، لا طلب بيانات حساسة. إن ظهرت مخاطر ارفع safety_level وأعطِ إرشاد طوارئ.
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
      model: "gpt-5.2",
      input: [
        { role: "system", content: (lang === "ar" ? system_ar : system_en) },
        { role: "user", content: String(text) }
      ],
      text: { format: { type: "json_object" } }
    };

    const r = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
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

    cache.set(ck, { ts: Date.now(), data: parsed });
    return res.json(parsed);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => console.log("Moaeen backend running on port", PORT));
