import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import Groq from "groq-sdk";

const app = express();

/* مهم جدًا لـ Railway */
app.set("trust proxy", 1);

/* ====== Config ====== */
const PORT = process.env.PORT || 3000;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!GROQ_API_KEY) {
  console.error("GROQ_API_KEY is missing");
  process.exit(1);
}

/* ====== Groq Init ====== */
const groq = new Groq({
  apiKey: GROQ_API_KEY,
});

/* ====== Middleware ====== */
app.use(express.json({ limit: "1mb" }));
app.use(cors({ origin: "*" }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 60,
});
app.use("/api/", limiter);

/* ====== Routes ====== */
app.get("/health", (req, res) => {
  res.json({ ok: true, ai: "groq", model: "llama3-8b-8192" });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "message is required" });
    }

    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "system",
          content:
            "You are Moaeen AI assistant. Reply in Arabic (Egyptian dialect) and English.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = completion.choices[0]?.message?.content;

    return res.json({
      reply_ar: reply,
      reply_en: reply,
    });
  } catch (error) {
    console.error("Groq error:", error);
    return res.status(500).json({
      reply_ar: "حصل خطأ في الذكاء الاصطناعي، حاول تاني",
      reply_en: "AI error, please try again",
    });
  }
});

/* ====== Start Server ====== */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
