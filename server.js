import express from "express";
import cors from "cors";
import Groq from "groq-sdk";

const app = express();
const PORT = process.env.PORT || 3000;

// 🔑 لازم يكون متضاف في Railway
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ===== Middleware =====
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.static("public"));

// ===== Test route =====
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// ===== Chat route =====
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ reply: "مفيش رسالة اتبعتت" });
  }

  try {
    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192", // ✅ موديل صحيح
      messages: [
        {
          role: "system",
          content:
            "أنت مساعد طبي اسمه معين، بترد بالعربي المصري بأسلوب بسيط وواضح، ومن غير ما تدّعي إنك دكتور.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply =
      completion.choices?.[0]?.message?.content ||
      "حصلت مشكلة، حاول تاني";

    res.json({ reply });
  } catch (err) {
    console.error("AI ERROR:", err.message);
    res.json({
      reply: "حصل خطأ في الاتصال بالذكاء الاصطناعي، حاول كمان شوية",
    });
  }
});

// ===== Start server =====
app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});
