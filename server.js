import express from "express";

const app = express();
app.use(express.json({ limit: "1mb" }));

// --------- Minimal CORS (needed for GitHub Pages -> Render) ----------
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
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

// --------- Simple per-IP rate limit (per day) ----------
const LIMIT_PER_DAY = Number(process.env.LIMIT_PER_DAY || 10);
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

// --------- Cache to reduce cost ----------
const cache = new Map(); // key -> {ts, data}
const CACHE_TTL_MS = Number(process.env.CACHE_TTL_MS || 6 * 60 * 60 * 1000); // 6 hours default
function cacheKey(text, lang) {
  return `${lang}::${text.trim().slice(0, 2000)}`; // safe bound
}

// --------- Strict safety shortcut ----------
function detectCritical(text = "") {
  const t = text.toLowerCase();
  const bad = [
    "انتحار","اموت","هقتل نفسي","اذي نفسي","مش عايز اعيش",
    "suicide","kill myself","self harm"
  ];
  return bad.some(k => t.includes(k));
}

app.get("/health", (req, res) => res.json({ ok: true }));

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

    // Cache
    const ck = cacheKey(String(text), String(lang || "ar"));
    const c = cache.get(ck);
    if (c && (Date.now() - c.ts) < CACHE_TTL_MS) {
      return res.json({ ...c.data, cached: true });
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
