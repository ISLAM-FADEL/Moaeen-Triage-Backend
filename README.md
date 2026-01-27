# Moaeen Triage Backend (Render Free)

## What this is
A tiny Node/Express backend that exposes:
- `GET /health`
- `POST /api/triage`  (calls OpenAI Responses API)

Includes:
- CORS headers (so GitHub Pages can call it)
- Simple per-IP daily rate limit (default 10/day)
- Simple cache (default 6 hours)

## Deploy on Render (Free)
1) Create a new GitHub repo and upload these files.
2) On Render: **New → Web Service → Connect repo**
3) Start Command: `npm start`
4) Environment Variables:
   - `OPENAI_API_KEY` = your key
   - (optional) `LIMIT_PER_DAY` = 10
   - (optional) `CACHE_TTL_MS` = 21600000

After deploy, test:
- `https://YOUR-APP.onrender.com/health` → `{ "ok": true }`

## Connect from your GitHub Pages HTML
Use:
`fetch("https://YOUR-APP.onrender.com/api/triage", ...)`
