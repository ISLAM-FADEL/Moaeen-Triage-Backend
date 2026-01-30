import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

// =====================
// CORS
// =====================
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

// =====================
const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY missing");
  process.exit(1);
}

// =====================
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// =====================
app.post("/api/chat", async (req, res) => {
  try {
    const { message, lang = "ar" } = req.body;

    if (!message) {
      return res.status(400).json({ error: "message is required" });
    }

    const systemPrompt =
      lang === "ar"
        ? "أنت مساعد ذكي اسمه مُعِين. ردك يكون عربي بسيط، هادي، ومفيد."
        : "You are Moaeen, a calm and helpful AI assistant.";

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: systemPrompt + "\n\n" + message }]
          }
        ]
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const reply =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response";

    res.json({ ok: true, reply });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Gemini error" });
  }
});

// =====================
app.listen(PORT, () => {
  console.log("✅ Server running on port", PORT);
});
