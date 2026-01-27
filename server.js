import express from "express";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error("❌ Missing OPENAI_API_KEY");
  process.exit(1);
}

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.post("/api/triage", async (req, res) => {
  const { text } = req.body || {};
  if (!text) {
    return res.status(400).json({ error: "text is required" });
  }

  try {
    const r = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-5.2",
        input: text
      })
    });

    const data = await r.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log("✅ Server running on port", PORT);
});
