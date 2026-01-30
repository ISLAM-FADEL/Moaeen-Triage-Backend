import express from "express";
import fetch from "node-fetch";

const app = express();

/* =======================
   Middlewares
======================= */
app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

/* =======================
   Env Variables
======================= */
const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY missing");
  process.exit(1);
}

/* =======================
   Health Check
======================= */
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

/* =======================
   Chat Endpoint
======================= */
app.post("/api/chat", async (req, res) => {
  try {
    const { message, lang = "en" } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "message is required",
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text:
                    lang === "ar"
                      ? `أجب باحترافية وبأسلوب طبي:\n${message}`
                      : `Answer professionally:\n${message}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini Error:", data);
      return res.status(500).json({
        error: "Gemini API error",
        details: data,
      });
    }

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response";

    res.json({
      reply,
    });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

/* =======================
   Start Server
======================= */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
