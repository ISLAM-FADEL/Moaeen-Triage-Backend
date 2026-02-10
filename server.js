<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>معين Mo'een — معينك الرقمي</title>

<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-title" content="معين">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap" rel="stylesheet">

<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.2/dist/chart.umd.min.js"></script>
<style>
/* =========================================
   🎨 V10 THEME ENGINE & UX ADJUSTMENTS
   ========================================= */
:root {
  /* Soft Wellness (Pastel) */
  --good: #34d399;          /* emerald */
  --warn: #fbbf24;          /* amber */
  --bad:  #fb7185;          /* rose */
  --accent-main: #7c6cff;   /* lavender */
  --accent-2: #2dd4bf;      /* teal */
  --accent-3: #fb7185;      /* rose */
  --font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  --font-family-ar: 'Cairo', var(--font-family);

  --bg: #fbfbff;
  --bg-gradient: linear-gradient(180deg, #fff7fb 0%, #f2fbff 55%, #fbfbff 100%);
  --card-bg: rgba(255, 255, 255, 0.82);
  --card-border: rgba(124, 108, 255, 0.14);
  --text: #1f2937;          /* gray-800 */
  --muted: #6b7280;         /* gray-500 */
  --accent: #2b2b3a;        /* ink */
  --accent-glow: rgba(124, 108, 255, 0.18);

  --radius-lg: 22px;
  --radius-md: 16px;
  --shadow-lg: 0 18px 50px rgba(17, 24, 39, 0.08);
  --shadow-md: 0 10px 30px rgba(17, 24, 39, 0.06);
  --shadow-sm: 0 6px 18px rgba(17, 24, 39, 0.05);
}

:root[data-theme="dark"] {
  /* Wellness Dark (soft, not harsh) */
  --bg: #0b1020;
  --bg-gradient: radial-gradient(1200px 700px at 20% -10%, rgba(124, 108, 255, 0.22) 0%, rgba(11, 16, 32, 0) 60%),
                 radial-gradient(900px 600px at 100% 0%, rgba(45, 212, 191, 0.16) 0%, rgba(11, 16, 32, 0) 55%),
                 linear-gradient(180deg, #070a14 0%, #0b1020 100%);
  --card-bg: rgba(255, 255, 255, 0.06);
  --card-border: rgba(255, 255, 255, 0.10);
  --text: #f1f5f9;
  --muted: #a1a1aa;
  --accent: #e9e7ff;
  --accent-glow: rgba(124, 108, 255, 0.22);
}

/* --- NEW: Logo Pulse & Glow Animations --- */
@keyframes pulse-moeen {
  0%   { transform: translateY(0) scale(1); }
  100% { transform: translateY(-2px) scale(1.02); }
}
@keyframes glow-pulse {
  0%, 100% { text-shadow: 0 0 10px rgba(124,108,255,0.28), 0 0 22px rgba(45,212,191,0.18); }
  50%      { text-shadow: 0 0 16px rgba(124,108,255,0.34), 0 0 30px rgba(251,113,133,0.16); }
}

/* Base Styles */
* { box-sizing: border-box; margin: 0; padding: 0; font-family: var(--font-family); transition: background-color 0.3s, color 0.3s; }
html[lang="ar"] * { font-family: var(--font-family-ar); }
body { 
  background: var(--bg) var(--bg-gradient); 
  color: var(--text); 
  min-height: 100vh; 
  display: flex; 
  flex-direction: column; 
  padding-bottom: 80px; 
}

body::before, body::after {
  content: "";
  position: fixed;
  inset: -200px;
  pointer-events: none;
  z-index: -1;
  filter: blur(40px);
  opacity: 0.55;
}
body::before {
  background:
    radial-gradient(400px 280px at 15% 20%, rgba(124,108,255,0.35) 0%, rgba(124,108,255,0) 70%),
    radial-gradient(420px 300px at 85% 10%, rgba(45,212,191,0.28) 0%, rgba(45,212,191,0) 65%),
    radial-gradient(380px 280px at 80% 80%, rgba(251,113,133,0.18) 0%, rgba(251,113,133,0) 70%);
}
body::after {
  background:
    radial-gradient(520px 380px at 10% 90%, rgba(45,212,191,0.18) 0%, rgba(45,212,191,0) 70%),
    radial-gradient(520px 380px at 95% 95%, rgba(124,108,255,0.16) 0%, rgba(124,108,255,0) 70%);
  opacity: 0.35;
}


/* Layout */
header { 
    padding: 0.9rem 1rem; 
    border-bottom: 1px solid var(--card-border); 
    display: flex; 
    justify-content: flex-end; 
    align-items: center; 
    background: rgba(255,255,255,0.55);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    position: sticky;
    top: 0;
    z-index: 10;
}
:root[data-theme="dark"] header { background: rgba(0,0,0,0.18); }

main { flex-grow: 1; padding: 1rem; max-width: 900px; width: 100%; margin: 0 auto; }
section { display: none; min-height: 80vh; padding-top: 2rem; }
section.active { display: block; }
h1, h2 { color: var(--accent-main); margin-bottom: 0.5rem; }
p { color: var(--muted); margin-bottom: 1rem; }

/* Logo Container */
#centralLogoContainer {
  display: flex;
  justify-content: center; 
  align-items: center;
  min-height: 30vh; 
}

#brandName{
  will-change: transform, text-shadow;
  animation: pulse-moeen 2.4s ease-in-out infinite alternate, glow-pulse 3.4s ease-in-out infinite alternate;
}
/* Components */
.card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-lg);
  padding: 1.35rem;
  margin-bottom: 1rem;
  box-shadow: var(--shadow-md);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
.card.flat { padding: 1rem; border-radius: var(--radius-md); }
.btn { 
  padding: 0.85rem 1.35rem; 
  border-radius: var(--radius-md); 
  cursor: pointer; 
  font-weight: 800; 
  border: none; 
  transition: transform 0.16s ease, box-shadow 0.16s ease, background-color 0.16s ease, opacity 0.16s ease; 
  text-decoration: none;
  touch-action: manipulation;
}
.btn:active { transform: translateY(1px) scale(0.99); }

.btn.primary { 
  background: linear-gradient(135deg, var(--accent-main) 0%, var(--accent-2) 100%);
  color: #ffffff; 
  box-shadow: 0 14px 30px var(--accent-glow); 
}
.btn.primary:hover { opacity: 0.96; transform: translateY(-1px); }

.btn.secondary { 
  background: rgba(255,255,255,0.55); 
  color: var(--text); 
  border: 1px solid var(--card-border); 
  box-shadow: var(--shadow-sm);
}
:root[data-theme="dark"] .btn.secondary { background: rgba(255,255,255,0.06); }
.btn.secondary:hover { background-color: rgba(124,108,255,0.08); }

/* Input Group */
.input-group { margin-bottom: 1rem; }
.input-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; color: var(--text); }

  border-radius: var(--radius-md);
  background: var(--card-bg);
  color: var(--text);
  font-size: 1rem;
}

/* Welcome Features Grid */
.feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
.feature-item h3 { color: var(--accent-main); margin-bottom: 0.25rem; }
.feature-item p { margin-bottom: 0; font-size: 0.9rem; }

/* Test Section */
#test { text-align: center; }
#qContainer { min-height: 40vh; display: flex; flex-direction: column; justify-content: center; align-items: center; }
/* New Style for QText container to center items including TTS button */
#qTextContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 1rem;
}
#qText { font-size: 1.5rem; font-weight: 700; color: var(--text); transition: opacity 0.2s; margin: 0; }
#optionsContainer { 
  display: flex; 
  flex-wrap: wrap; 
  gap: 1rem; 
  justify-content: center; 
  margin-top: 2rem; 
  max-width: 600px; 
  margin-left: auto; 
  margin-right: auto;
}
.opt-card {
  flex-grow: 1;
  min-width: 120px;
  padding: 1.5rem 1rem;
  border: 2px solid var(--card-border);
  border-radius: 12px;
  cursor: pointer;
  background: var(--card-bg);
  text-align: center;
  transition: all 0.2s;
}
.opt-card:hover { border-color: var(--accent-main); }
.opt-card.selected { border-color: var(--good); background-color: rgba(74, 222, 128, 0.1); }
.opt-emoji { font-size: 2rem; margin-bottom: 0.5rem; }
.opt-label { font-weight: 600; color: var(--text); }
.progress-container { width: 100%; height: 8px; background: var(--card-border); border-radius: 4px; overflow: hidden; margin-bottom: 1rem; }
#progressBar { height: 100%; width: 0; background-color: var(--accent-main); transition: width 0.3s; }
#qDomainBadge { 
  display: inline-block; 
  padding: 0.25rem 0.75rem; 
  border-radius: 9999px; 
  background-color: var(--accent-main); 
  color: #fff; 
  font-size: 0.8rem; 
  font-weight: 700; 
}

/* Result Section */
#resultChartContainer { height: 400px; width: 100%; max-width: 700px; margin: 2rem auto; }
#overallScorePill { font-size: 1.25rem; font-weight: 900; padding: 0.5rem 1.5rem; border-radius: 9999px; text-align: center; margin-bottom: 1rem; }
.pill.good { background-color: var(--good); color: #0f172a; }
.pill.warn { background-color: var(--warn); color: #0f172a; }
.pill.bad { background-color: var(--bad); color: #ffffff; }

/* Heatmap */
#riskHeatmap { 
  display: grid; 
  grid-template-columns: 1fr 1fr; 
  gap: 1rem; 
  margin-top: 1rem;
}
.heat-cell { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
}
.heat-cell.good { background-color: rgba(74, 222, 128, 0.1); border-color: var(--good); }
.heat-cell.warn { background-color: rgba(251, 191, 36, 0.1); border-color: var(--warn); }
.heat-cell.bad { background-color: rgba(248, 113, 113, 0.1); border-color: var(--bad); }

/* Supportive Content */
.support-section { 
  margin-top: 2rem; 
  border-top: 1px dashed var(--card-border); 
  padding-top: 1.5rem;
}
.support-section h3 { color: var(--accent-main); margin-bottom: 0.75rem; }
.advice-list, .helpline-list { list-style: none; padding-right: 0; }
.advice-list li, .helpline-list li { margin-bottom: 0.5rem; color: var(--text); }
.advice-list li::before { content: '•'; margin-left: 10px; color: var(--good); font-weight: 900; }
.quran-box { 
  margin-top: 1rem; 
  padding: 1rem; 
  background-color: var(--card-border); 
  border-radius: 8px; 
  font-style: italic; 
  text-align: center;
}
.quran-box p { color: var(--text); margin-bottom: 0.5rem; font-size: 0.9rem; }

/* Trend Box */
#trendBox { 
    display: none;
    align-items: center; 
    padding: 0.75rem; 
    margin-bottom: 1rem; 
    border-radius: 8px; 
    border: 1px solid var(--card-border);
}
#trendBox span { font-weight: 600; margin-left: 0.5rem; }

/* Action Bar */
#actionBar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: var(--card-bg);
  border-top: 1px solid var(--card-border);
  display: none; /* Controlled by JS */
  justify-content: center;
  gap: 1rem;
  z-index: 100;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
}

/* History */
#historyList { display: grid; gap: 0.5rem; }
.history-item-content { display: flex; justify-content: space-between; align-items: center; }
.history-actions { display: flex; gap: 0.5rem; align-items: center; }
.text-muted { color: var(--muted); font-size: 0.9rem; }

/* Mobile */
@media (max-width: 600px) {
  .feature-grid, #riskHeatmap { grid-template-columns: 1fr; }
  .btn { padding: 0.5rem 1rem; font-size: 0.9rem; }
  #overallScorePill { font-size: 1rem; }
  #actionBar { flex-direction: column; }
  .history-actions { flex-direction: column; align-items: flex-end; }
  .history-actions > * { width: 100%; text-align: center; margin-bottom: 5px; }
}

/* Print View Fix */
@media print {
    body { background: #fff !important; color: #000 !important; }
    #reportContent { color: #000 !important; background: #fff !important; border: none !important; padding: 0 !important; margin: 0 !important; }
    header, #test, #setup, #history, #actionBar, #navHistory, #welcome, #developers_page { display: none !important; }
    section#result.active { display: block !important; padding-top: 0 !important; }
    .card { background: #fff !important; border: 1px solid #ccc !important; box-shadow: none !important; }
    .pill.good, .pill.warn, .pill.bad { color: #000 !important; border: 1px solid #000 !important; background: none !important; }
    canvas { width: 100% !important; max-width: 100% !important; height: auto !important; }
}

/* --- Disclaimer Modal --- */
.modal-backdrop{
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.55);
  display: flex; align-items: center; justify-content: center;
  z-index: 999;
  padding: 1rem;
}
.modal{
  width: min(720px, 100%);
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.35);
  padding: 1.25rem;
}
.modal.hidden{ display:none; }
.modal h3{ margin-bottom: 0.5rem; color: var(--accent-main); }
.modal p{ margin-bottom: 0.75rem; color: var(--text); }
.modal ul{ margin: 0.5rem 0 1rem 0; padding: 0; list-style: none; }
.modal li{ margin-bottom: 0.5rem; color: var(--muted); }
.modal li::before{ content:'•'; margin-left: 10px; color: var(--accent-main); font-weight: 900; }
.modal-actions{ display:flex; gap:0.75rem; justify-content:flex-end; flex-wrap:wrap; }

/* --- User/Admin modals additions --- */
.user-row{display:flex; gap:.5rem; align-items:center; margin:.5rem 0; flex-wrap:wrap;}
.select,.textarea{width:100%; padding:.8rem; border-radius:14px; border:1px solid rgba(255,255,255,.18); background:rgba(255,255,255,.06); color:var(--text); outline:none;}
.modal.admin{max-width:920px;}
.textarea{min-height:52vh; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; font-size:12px; line-height:1.55; direction:ltr;}
.admin-actions{display:flex; gap:.5rem; flex-wrap:wrap; margin:.6rem 0 .8rem;}
.btn.danger{background: rgba(255, 80, 80, .22); border: 1px solid rgba(255, 80, 80, .35);}
.btn.danger:hover{transform: translateY(-1px); filter: brightness(1.05);}
.muted{opacity:.85; font-size:.92rem;}


/* =========================================================
   ✅ V14 ADVANCED UI PATCH (Performance-safe, RTL-first)
   - Keeps all IDs/classes/JS behavior from v12_1_fixed
   - Improves spacing, typography, cards, inputs, buttons
   - Better mobile stability (less blur/shadow load)
   ========================================================= */

/* smoother fonts & rendering */
:root{
  --radius-lg: 22px;
  --radius-md: 16px;
  --radius-sm: 12px;
  --shadow-soft: 0 14px 50px rgba(0,0,0,.12);
  --shadow-card: 0 10px 30px rgba(0,0,0,.10);
  --shadow-float: 0 18px 60px rgba(0,0,0,.16);
  --blur-soft: blur(10px);
  --tap: rgba(2, 132, 199, .15);
  --ring: 0 0 0 3px rgba(2, 132, 199, .18);
  --ring-dark: 0 0 0 3px rgba(0, 198, 255, .18);
  --grid-gap: 14px;
}

/* Light theme refinement */
:root{
  --bg: #f6f7fb;
  --bg2: radial-gradient(1200px 700px at 20% 15%, rgba(2,132,199,.10), transparent 60%),
         radial-gradient(900px 600px at 80% 25%, rgba(99,102,241,.10), transparent 55%),
         radial-gradient(1000px 700px at 50% 90%, rgba(16,185,129,.08), transparent 60%);
  --surface: rgba(255,255,255,.72);
  --surface2: rgba(255,255,255,.92);
  --border: rgba(15, 23, 42, .10);
  --text: #0f172a;
  --muted: rgba(15,23,42,.62);
  --accent: #0284c7;
  --accent2: #6366f1;
}

/* Dark theme refinement */
:root[data-theme="dark"]{
  --bg: #070a14;
  --bg2: radial-gradient(1200px 700px at 20% 10%, rgba(0,198,255,.16), transparent 62%),
         radial-gradient(900px 650px at 80% 25%, rgba(99,102,241,.16), transparent 60%),
         radial-gradient(1000px 700px at 40% 90%, rgba(16,185,129,.12), transparent 62%);
  --surface: rgba(15, 23, 42, .62);
  --surface2: rgba(15, 23, 42, .82);
  --border: rgba(255,255,255,.10);
  --text: rgba(255,255,255,.92);
  --muted: rgba(255,255,255,.62);
  --accent: #00c6ff;
  --accent2: #7c3aed;
}

/* page background */
html,body{height:100%;}
body{
  background: var(--bg);
  background-image: var(--bg2);
  color: var(--text);
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
}

/* App shell spacing */
.container{
  max-width: 980px;
  padding-inline: 14px;
}

/* Top header bar: sticky, light blur (performance-safe) */
header{
  position: sticky;
  top: 0;
  z-index: 30;
  background: transparent;
}
.topbar{
  margin: 10px auto 14px;
  border-radius: var(--radius-lg);
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-soft);
  backdrop-filter: var(--blur-soft);
  -webkit-backdrop-filter: var(--blur-soft);
  padding: 10px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
.topbar .left, .topbar .right{
  display:flex; align-items:center; gap:10px;
}

/* icon buttons */
.iconBtn{
  width: 44px; height: 44px;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: var(--surface2);
  color: var(--text);
  box-shadow: 0 8px 18px rgba(0,0,0,.08);
  transition: transform .18s ease, box-shadow .18s ease, background .18s ease;
}
.iconBtn:active{ transform: scale(.98); }
.iconBtn:hover{ box-shadow: 0 12px 24px rgba(0,0,0,.12); }
.iconBtn:focus{ outline: none; box-shadow: var(--shadow-card), var(--ring); }
:root[data-theme="dark"] .iconBtn:focus{ box-shadow: var(--shadow-card), var(--ring-dark); }

/* Main panels/cards */
.panel{
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  backdrop-filter: var(--blur-soft);
  -webkit-backdrop-filter: var(--blur-soft);
  overflow: hidden;
}
.card{
  background: transparent; /* keep existing internal spacing */
  border: 0;
  box-shadow: none;
}
section{
  margin-bottom: 14px;
}

/* Hero / welcome header (logo area) */
#logoCard{
  border-radius: var(--radius-lg);
  overflow: hidden;
  position: relative;
  isolation: isolate;
}
#logoCard::before{
  content:"";
  position:absolute; inset:-2px;
  background: radial-gradient(900px 260px at 30% 20%, rgba(2,132,199,.25), transparent 60%),
              radial-gradient(700px 240px at 85% 30%, rgba(99,102,241,.22), transparent 60%),
              linear-gradient(180deg, rgba(255,255,255,.30), rgba(255,255,255,0));
  opacity: .9;
  pointer-events:none;
}
:root[data-theme="dark"] #logoCard::before{
  background: radial-gradient(900px 260px at 30% 20%, rgba(0,198,255,.22), transparent 60%),
              radial-gradient(700px 240px at 85% 30%, rgba(124,58,237,.22), transparent 60%),
              linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,0));
}
#brandName{
  letter-spacing: .5px;
  text-shadow: 0 10px 30px rgba(0,0,0,.20);
}

/* Inputs */
.input, .select, .textarea, input, select, textarea{
  width: 100%;
  border-radius: var(--radius-md) !important;
  border: 1px solid var(--border) !important;
  background: var(--surface2) !important;
  color: var(--text) !important;
  padding: 14px 14px !important;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.35);
  transition: box-shadow .18s ease, transform .18s ease, border-color .18s ease;
}
.input:focus, .select:focus, .textarea:focus, input:focus, select:focus, textarea:focus{
  outline: none !important;
  border-color: rgba(2,132,199,.45) !important;
  box-shadow: var(--ring) !important;
}
:root[data-theme="dark"] .input:focus,
:root[data-theme="dark"] .select:focus,
:root[data-theme="dark"] .textarea:focus,
:root[data-theme="dark"] input:focus,
:root[data-theme="dark"] select:focus,
:root[data-theme="dark"] textarea:focus{
  border-color: rgba(0,198,255,.45) !important;
  box-shadow: var(--ring-dark) !important;
}

.input-group{
  display: grid;
  gap: var(--grid-gap);
}

/* Buttons */
.btn{
  border-radius: 999px !important;
  border: 1px solid transparent;
  padding: 12px 16px !important;
  font-weight: 700;
  letter-spacing: .2px;
  transition: transform .18s ease, box-shadow .18s ease, filter .18s ease;
}
.btn:active{ transform: translateY(1px); }
.btn.primary{
  background: linear-gradient(90deg, var(--accent), var(--accent2)) !important;
  color: #fff !important;
  box-shadow: 0 14px 40px rgba(2,132,199,.22);
}
:root[data-theme="dark"] .btn.primary{
  box-shadow: 0 14px 40px rgba(0,198,255,.14);
}
.btn.secondary{
  background: var(--surface2) !important;
  color: var(--text) !important;
  border-color: var(--border) !important;
}
.btn.flat{
  background: transparent !important;
  color: var(--text) !important;
  border-color: transparent !important;
}

/* Action bar: floating pill */
#actionBar{
  position: sticky;
  bottom: 14px;
  z-index: 25;
  margin-top: 14px;
}
#actionBar .card{
  border-radius: 999px;
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-float);
  backdrop-filter: var(--blur-soft);
  -webkit-backdrop-filter: var(--blur-soft);
  padding: 10px;
}
#actionBar .btn{ min-height: 44px; }

/* Modals */
.modal-backdrop{
  background: rgba(0,0,0,.45) !important;
  backdrop-filter: blur(6px);
}
.modal{
  border-radius: var(--radius-lg) !important;
  border: 1px solid var(--border) !important;
  background: var(--surface2) !important;
  color: var(--text) !important;
  box-shadow: var(--shadow-float) !important;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce){
  *{ animation: none !important; transition: none !important; scroll-behavior: auto !important; }
}

/* Small screens */
@media (max-width: 420px){
  #brandName{ font-size: 2.8rem !important; }
  .topbar{ padding: 8px; }
  .iconBtn{ width: 42px; height: 42px; }
}

/* Print safety (keep v12 behavior, but ensure clean page) */
@media print{
  body{ background:#fff !important; background-image:none !important; }
  .panel{ background:#fff !important; box-shadow:none !important; border:0 !important; }
  .topbar{ display:none !important; }
}


/* --- NEW: Test action buttons layout --- */
.test-actions{
  margin-top: 2rem;
  display:flex;
  gap: .75rem;
  flex-wrap: wrap;
  justify-content: center;
}
.test-actions .btn{ flex: 1 1 140px; }

/* --- NEW: Review screen --- */
#reviewList{
  display:flex;
  flex-direction: column;
  gap: .75rem;
  margin-top: 1rem;
}
.review-item{
  display:flex;
  gap:.75rem;
  align-items:flex-start;
  padding: .9rem;
  border: 1px solid var(--card-border);
  border-radius: 12px;
  background: var(--card-bg);
}
.review-item .num{
  min-width: 42px;
  height: 42px;
  border-radius: 10px;
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight: 800;
  background: rgba(2,132,199,.10);
  color: var(--accent-main);
}
.review-item.unanswered .num{
  background: rgba(248,113,113,.15);
  color: var(--bad);
}
.review-item .meta{
  display:flex;
  flex-direction:column;
  gap:.25rem;
  flex:1;
}
.review-item .q{
  font-weight: 700;
  color: var(--text);
}
.review-item .a{
  color: var(--muted);
  font-size: .95rem;
}
.review-item .jump{
  white-space: nowrap;
  align-self:center;
}
.review-actions{
  margin-top: 1rem;
  display:flex;
  gap:.75rem;
  flex-wrap: wrap;
  justify-content: center;
}
.review-actions .btn{ flex: 1 1 180px; }


/* --- Developers Page (Modern) --- */
.devs-wrap{max-width:980px;margin:0 auto;padding:8px 6px 24px;}
.devs-hero{text-align:center;margin:6px 0 18px;}
.devs-title{margin:0;font-size:1.7rem;letter-spacing:.2px}
.devs-sub{margin:.35rem 0 0;opacity:.9}
.dev-grid{display:grid;grid-template-columns:1fr;gap:14px;margin-top:14px}
@media (min-width:720px){.dev-grid{grid-template-columns:1fr 1fr}}
.dev-card{
  display:flex;align-items:center;gap:14px;
  background:var(--card-bg);border:1px solid var(--card-border);
  border-radius:18px;padding:14px 14px;
  box-shadow:0 12px 30px rgba(0,0,0,.12);
}
.dev-avatar{
  width:54px;height:54px;flex:0 0 54px;border-radius:16px;
  display:flex;align-items:center;justify-content:center;
  font-weight:900;letter-spacing:.6px;
  color:#fff;
  background:linear-gradient(135deg,var(--accent-main),var(--accent-2));
  box-shadow:0 10px 22px rgba(0,0,0,.18);
}
.dev-name{font-weight:850;font-size:1.05rem;line-height:1.15;color:var(--text)}
.dev-role{margin-top:.15rem;font-size:.92rem}
.thanks-card{
  margin-top:18px;
  background:linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.01));
  border:1px solid var(--card-border);
  border-radius:22px;
  padding:14px 14px;
  box-shadow:0 14px 34px rgba(0,0,0,.16);
}
.thanks-row{display:flex;align-items:center;gap:14px}
.thanks-badge{
  padding:10px 12px;border-radius:14px;
  font-weight:900;letter-spacing:.2px;
  color:var(--text);
  background:rgba(255,255,255,.06);
  border:1px solid var(--card-border);
  white-space:nowrap;
}
.thanks-content{flex:1;min-width:0}
.thanks-label{font-size:.88rem;opacity:.85}
.thanks-main{font-weight:900;font-size:1.1rem;margin-top:.15rem}
.hti-link{
  display:inline-block;margin-top:.15rem;
  font-weight:850;
  color:var(--text);
  text-decoration:underline;
  text-decoration-color:rgba(255,255,255,.35);
  text-underline-offset:4px;
}
.hti-link:hover{opacity:.92;text-decoration-color:var(--accent-main)}
.hti-logo{width:64px;height:64px;opacity:.5;filter:drop-shadow(0 10px 18px rgba(0,0,0,.22))}
.hti-logo svg{width:100%;height:100%}
@media (max-width:420px){
  .thanks-row{flex-wrap:wrap}
  .hti-logo{width:56px;height:56px;margin-left:auto}
}
/* --- End Developers Page --- */


/* --- Voice UI helpers --- */
#voiceStatus.listening{ font-weight:800; }
@keyframes micPulse { 0%{ transform:scale(1); } 100%{ transform:scale(1.03); } }
.micPulse{ animation: micPulse .8s ease-in-out infinite alternate; }


/* --- Result reveal + emotion-aware theme --- */
.reveal { opacity: 0; transform: translateY(10px); transition: opacity .5s ease, transform .5s ease; }
.reveal.show { opacity: 1; transform: translateY(0); }
:root[data-state="stable"] { --accent-main: #22c55e; }
:root[data-state="warn"] { --accent-main: #f59e0b; }
:root[data-state="bad"] { --accent-main: #ef4444; }

/* --- Guided breathing widget --- */
.breath-wrap{ margin-top:12px; display:grid; gap:14px; }
.breath-circle{
  width:min(280px, 70vw);
  aspect-ratio: 1 / 1;
  border-radius:999px;
  margin: 8px auto 0;
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  background: radial-gradient(circle at 30% 30%, rgba(255,255,255,.18), rgba(255,255,255,0) 55%),
              linear-gradient(135deg, rgba(34,197,94,.18), rgba(59,130,246,.10));
  border: 1px solid var(--border);
  box-shadow: 0 20px 60px rgba(0,0,0,.08);
  transform: scale(0.92);
  transition: transform 1s ease;
}
.breath-circle.inhale{ transform: scale(1.02); }
.breath-circle.hold{ transform: scale(1.02); }
.breath-circle.exhale{ transform: scale(0.88); }
.breath-label{ font-weight:800; font-size:1.1rem; }
.breath-timer{ margin-top:6px; font-weight:700; opacity:.9; }
.breath-controls{ display:flex; justify-content:center; gap:10px; flex-wrap:wrap; }
.guided-grid{ display:grid; grid-template-columns: 1fr 1fr; gap:10px; }
@media (max-width: 520px){ .guided-grid{ grid-template-columns: 1fr; } }

/* --- Modal actions layout --- */
.modal-actions{ display:flex; gap:10px; justify-content:flex-end; flex-wrap:wrap; margin-top:14px; }



/* --- Doctor connect card --- */
#doctorConnectCard input, #doctorConnectCard select{
  width: 100%;
  padding: .75rem .85rem;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: var(--card);
  color: var(--text);
}
#doctorConnectCard textarea{
  border-radius: 14px;
  border: 1px solid var(--border);
  background: var(--card);
  color: var(--text);
  padding: .75rem .85rem;
  line-height: 1.5;
}


/* --- Moa'een Doctor Directory cards --- */
.docCard{
  border:1px solid var(--border);
  background: var(--card-bg);
  border-radius: 18px;
  padding: 14px;
  box-shadow: 0 10px 30px rgba(0,0,0,.06);
}
.docCard .top{
  display:flex; align-items:flex-start; justify-content:space-between; gap:10px; flex-wrap:wrap;
}
.docCard .name{ font-weight:900; }
.docCard .meta{ color: var(--muted); font-size:.95rem; margin-top:4px; }
.docTags{ display:flex; gap:8px; flex-wrap:wrap; margin-top:10px; }
.docTags .tag{
  border:1px solid var(--card-border);
  border-radius: 999px;
  padding: 6px 10px;
  font-size:.9rem;
  background: rgba(255,255,255,0.04);
}
.docActions{ display:flex; gap:10px; justify-content:flex-end; flex-wrap:wrap; margin-top:12px; }

/* --- Appointments UI --- */
.apptCard{
  border:1px solid var(--border);
  background: var(--card);
  border-radius: 18px;
  padding: 14px;
  box-shadow: 0 10px 30px rgba(0,0,0,.06);
}
.apptCard .top{
  display:flex; align-items:flex-start; justify-content:space-between; gap:10px; flex-wrap:wrap;
}
.apptCard .title{ font-weight:900; }
.apptCard .meta{ color: var(--muted); font-size:.95rem; margin-top:4px; }
.apptActions{ display:flex; gap:10px; justify-content:flex-end; flex-wrap:wrap; margin-top:12px; }
#bookingBackdrop select, #bookingBackdrop input{
  width:100%;
  padding:.75rem .85rem;
  border-radius: 14px;
  border:1px solid var(--border);
  background: var(--card);
  color: var(--text);
}
</style>
</head>
<body>

<header>
    <div style="display: flex; gap: 0.5rem; margin-inline-start: auto;">
        <button id="devsToggle" class="btn secondary">👨‍💻</button> 
        <button id="themeToggle" class="btn secondary">☾</button>
        <button id="langToggle" class="btn secondary">EN</button>
        <button id="userToggle" class="btn secondary">👤</button>
        <button id="adminToggle" class="btn secondary">⚙️</button>
        <button id="navHistory" class="btn secondary">📂</button>
    <button id="navAppointments" class="btn secondary">📅</button>
</div>
</header>


<!-- Disclaimer Modal (first run) -->
<div id="disclaimerBackdrop" class="modal-backdrop modal hidden">
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="discTitle">
    <h3 id="discTitle">مهم قبل الاستخدام</h3>
    <p id="discIntro">معين أداة تقييم ذاتي تعليمية، وليست تشخيصا طبيا.</p>
    <ul>
      <li id="disc1">النتائج تقديرية ولا تغني عن الطبيب/الأخصائي.</li>
      <li id="disc2">لو عندك أفكار بإيذاء النفس أو خطر عاجل—اتواصل فورا مع شخص قريب أو جهة طوارئ.</li>
      <li id="disc3">بياناتك بتتخزن على جهازك فقط (LocalStorage) مش على سيرفر.</li>
    </ul>
    <div class="modal-actions">
      <button id="discOk" class="btn primary">موافق</button>
    </div>
  </div>

</div>


<div id="emergencyBackdrop" class="modal-backdrop modal hidden">
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="emTitle">
    <h3 id="emTitle">🚨 تنبيه مهم</h3>
    <p id="emBody" class="text-muted" style="margin-top:.25rem;">
      لاحظنا مؤشرات محتملة لخطر إيذاء النفس. <b>معين مش خدمة طوارئ</b>. لو في خطر فوري، اتواصل فورًا مع شخص قريب أو جهة طوارئ.
    </p>

    <div class="card flat" style="margin-top:12px;">
      <h4 style="margin:0 0 8px 0;">📞 جهات مساعدة (مثال)</h4>
      <ul class="helpline-list" style="margin:0;">
        <li><b>الطوارئ:</b> 122</li>
        <li><b>الإسعاف:</b> 123</li>
        <li><b>شخص موثوق:</b> صديق/قريب الآن</li>
      </ul>
      <p class="text-muted" style="margin:10px 0 0 0; font-size:.95rem;">
        لو تقدر، ابعد أي أدوات ممكن تضرّك، وخليك مع حد قريب لحد ما تهدى.
      </p>
    </div>

    <div class="modal-actions">
      <button id="emBreatheBtn" class="btn">ابدأ تمرين تنفّس</button>
      <button id="emCloseBtn" class="btn secondary">فهمت</button>
    </div>
  </div>

<div id="bookingBackdrop" class="modal-backdrop modal hidden">
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="bkTitle">
    <h3 id="bkTitle">📅 حجز موعد / استشارة عن بُعد</h3>
    <p id="bkDoctorLine" class="text-muted" style="margin-top:.25rem;"></p>

    <div class="card flat" style="margin-top:12px;">
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
        <label style="display:grid; gap:6px;">
          <span class="text-muted" style="font-size:.95rem;">نوع الخدمة</span>
          <select id="bkType">
            <option value="video">📹 استشارة فيديو</option>
            <option value="phone">📞 مكالمة</option>
            <option value="chat">💬 شات (واتساب)</option>
            <option value="visit">🏥 كشف في العيادة</option>
          </select>
        </label>

        <label style="display:grid; gap:6px;">
          <span class="text-muted" style="font-size:.95rem;">التاريخ</span>
          <input id="bkDate" type="date" />
        </label>

        <label style="display:grid; gap:6px;">
          <span class="text-muted" style="font-size:.95rem;">الوقت</span>
          <input id="bkTime" type="time" />
        </label>

        <label style="display:grid; gap:6px;">
          <span class="text-muted" style="font-size:.95rem;">ملاحظات (اختياري)</span>
          <input id="bkNotes" placeholder="مثال: الأعراض من شهر..." />
        </label>
      </div>

      <div class="card flat" id="bkPreviewCard" style="margin-top:12px;">
        <h4 style="margin:0 0 6px 0;">🔗 رابط الاستشارة</h4>
        <p class="text-muted" id="bkPreviewText" style="margin:0;">
          سيتم إنشاء رابط تلقائيًا عند تأكيد الحجز (لفيديو).
        </p>
      </div>

      <div class="modal-actions">
        <button id="bkConfirmBtn" class="btn" type="button">✅ تأكيد الحجز</button>
        <button id="bkCancelBtn" class="btn secondary" type="button">إلغاء</button>
      </div>
    </div>
  </div>
</div>


</div>




<!-- User Switcher Modal -->
<div id="userBackdrop" class="modal-backdrop modal hidden">
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="userTitle">
    <h3 id="userTitle">المستخدم</h3>
    <p id="userHint" class="muted">اختار مستخدم أو اعمل واحد جديد. كل مستخدم ليه سجل (History) منفصل على جهازك.</p>
    <div class="user-row">
      <select id="userSelect" class="select"></select>
      <button id="userSelectBtn" class="btn primary">اختيار</button>
    </div>
    <div class="user-row">
      <input id="newUserName" class="input" placeholder="اسم المستخدم الجديد" />
      <button id="addUserBtn" class="btn secondary">إضافة</button>
    </div>
    <div class="user-row">
      <input id="renameUserName" class="input" placeholder="تعديل اسم المستخدم الحالي" />
      <button id="renameUserBtn" class="btn secondary">تعديل</button>
      <button id="deleteUserBtn" class="btn danger">حذف</button>
    </div>
    <div class="modal-actions">
      <button id="userClose" class="btn secondary">إغلاق</button>
    </div>
  </div>
</div>

<!-- Admin / Questionnaire Editor Modal -->
<div id="adminBackdrop" class="modal-backdrop modal hidden">
  <div class="modal admin" role="dialog" aria-modal="true" aria-labelledby="adminTitle">
    <h3 id="adminTitle">لوحة الإدارة (تعديل الأسئلة)</h3>
    <p id="adminHint" class="muted">عدل JSON ثم احفظ. لو حصل خطأ، اضغط استرجاع الافتراضي.</p>

    <div class="admin-actions">
      <button id="exportConfigBtn" class="btn secondary">تصدير JSON</button>
      <button id="importConfigBtn" class="btn secondary">استيراد JSON</button>
      <button id="resetConfigBtn" class="btn danger">استرجاع الافتراضي</button>
      <button id="saveConfigBtn" class="btn primary">حفظ</button>
    </div>

    <textarea id="configEditor" class="textarea" spellcheck="false"></textarea>

    <div class="modal-actions">
      <button id="adminClose" class="btn secondary">إغلاق</button>
    </div>
  </div>
</div>

<main>

    <section id="welcome" class="active">
        
        <div id="centralLogoContainer">
            <h1 id="brandName">Mo'een</h1> 
        </div>

        <p id="brandSub" style="margin: 0; font-size: 1rem; text-align: center; margin-bottom: 2rem;"></p>
        
        <h1 id="welcomeTitle" style="text-align: center;"></h1>
        <p id="welcomeSub" style="text-align: center;"></p>
        
        <div class="feature-grid">
            <div class="card feature-item">
                <h3 id="feature1Title"></h3>
                <p id="feature1Sub"></p>
            </div>
            <div class="card feature-item">
                <h3 id="feature2Title"></h3>
                <p id="feature2Sub"></p>
            </div>
        </div>
        
        <div style="text-align: center; margin-top: 3rem;">
            <button id="welcomeBtn" class="btn primary" style="min-width: 200px;">ابدأ</button>
        </div>
        <div style="text-align: center; margin-top: 1rem;">
            <button id="askOpenBtn" class="btn secondary" style="min-width: 200px;">اسأل معين</button>
        </div>
        <div style="display:flex; gap:.75rem; flex-wrap:wrap; justify-content:center; margin-top:.75rem;">
            <button id="quickOpenBtn" class="btn secondary" style="min-width: 200px;">فحص سريع</button>
            <button id="moodOpenBtn" class="btn secondary" style="min-width: 200px;">مزاجي اليوم</button>
            <button id="ethicsOpenBtn" class="btn secondary" style="min-width: 200px;">الأمان والأخلاقيات</button>
        </div>

    </section>

    
    <section id="developers_page">
      <div class="devs-wrap">
        <div class="devs-hero">
          <h2 class="devs-title">Mo'een Development Team</h2>
          <p class="devs-sub text-muted">Meet the team behind Mo'een — design, engineering, research.</p>
        </div>

        <div class="dev-grid">
          <div class="dev-card">
            <div class="dev-avatar" aria-hidden="true">IO</div>
            <div class="dev-info">
              <div class="dev-name">Islam Osman Ahmed Fadel</div>
              <div class="dev-role text-muted">Lead Developer &amp; UI/UX</div>
            </div>
          </div>

          <div class="dev-card">
            <div class="dev-avatar" aria-hidden="true">MM</div>
            <div class="dev-info">
              <div class="dev-name">Mahmoud Amro Mahmoud</div>
              <div class="dev-role text-muted">Back-End Engineer</div>
            </div>
          </div>

          <div class="dev-card">
            <div class="dev-avatar" aria-hidden="true">ME</div>
            <div class="dev-info">
              <div class="dev-name">Mohanad Emad</div>
              <div class="dev-role text-muted">Front-End Engineer</div>
            </div>
          </div>

          <div class="dev-card">
            <div class="dev-avatar" aria-hidden="true">AE</div>
            <div class="dev-info">
              <div class="dev-name">Ahmed Mohamed Elshaht</div>
              <div class="dev-role text-muted">UI/UX Designer</div>
            </div>
          </div>

          <div class="dev-card">
            <div class="dev-avatar" aria-hidden="true">AR</div>
            <div class="dev-info">
              <div class="dev-name">Ahmed Reda Elsayed</div>
              <div class="dev-role text-muted">Research &amp; QA</div>
            </div>
          </div>
        </div>

        <div class="thanks-card">
          <div class="thanks-row">
            <div class="thanks-badge">Special Thanks</div>
            <div class="thanks-content">
              <div class="thanks-label text-muted">Supervisor</div>
              <div class="thanks-main">Biomedical Engineering Department</div>

              <div class="thanks-label text-muted" style="margin-top:.75rem;">Institution</div>
              <a class="hti-link" href="https://hti.edu.eg" target="_blank" rel="noopener noreferrer">
                Higher Technological Institute (HTI)
              </a>
            </div>

            <div class="hti-logo" aria-hidden="true" title="Higher Technological Institute (HTI)">
              <svg viewBox="0 0 120 120" role="img" aria-label="HTI">
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stop-color="var(--accent-main)"/>
                    <stop offset="1" stop-color="var(--accent-2)"/>
                  </linearGradient>
                </defs>
                <circle cx="60" cy="60" r="52" fill="none" stroke="url(#g1)" stroke-width="6" opacity="0.8"/>
                <path d="M30 72 L60 30 L90 72" fill="none" stroke="url(#g1)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" opacity="0.35"/>
                <text x="60" y="72" text-anchor="middle" font-size="28" font-weight="800" fill="url(#g1)" opacity="0.85" font-family="system-ui, -apple-system, Segoe UI, Roboto, Arial">HTI</text>
              </svg>
            </div>
          </div>
        </div>

        <div style="text-align: center; margin-top: 2rem;">
          <button class="btn secondary" onclick="app.showSection('welcome')">عودة / Back</button>
        </div>
      </div>
    </section>



    <section id="ask">
        <div class="card" style="max-width: 820px; margin: 0 auto;">
            <h2 id="askTitle">اسأل معين</h2>
            <p id="askSub" class="text-muted">اكتب اللي حاسه أو المشكلة… ومعين هيطلعلك تحليل مبدئي + أنسب اختبار.</p>

            <div class="input-group">
                <label id="askLabel" for="askInput">وصف حالتك</label>
                <textarea id="askInput" rows="6" style="direction: rtl;" placeholder="مثال: بقالي أسبوعين مش بنام كويس وقلقان طول الوقت..."></textarea>

            <!-- 🎙️ Voice: record & live dictation (browser-native) -->
            <div class="card" id="voiceCard" style="margin-top:1rem;">
                <h3 id="voiceTitle" style="margin-top:0;">🎙️ الصوت</h3>
                <p id="voiceHint" class="text-muted" style="margin-bottom:.75rem;">
                    تقدر تسجل صوتك (Audio) أو تعمل إملاء صوتي مباشر (Dictation) ويتكتب في خانة النص.
                </p>

                <div style="display:flex; gap:.6rem; flex-wrap:wrap; justify-content:center;">
                    <button id="dictateBtn" class="btn secondary" type="button">🎤 إملاء مباشر</button>
                    <button id="dictateStopBtn" class="btn secondary" type="button" style="display:none;">⏹️ إيقاف الإملاء</button>

                    <button id="recBtn" class="btn primary" type="button">⏺️ تسجيل</button>
                    <button id="recStopBtn" class="btn secondary" type="button" style="display:none;">⏹️ إيقاف التسجيل</button>
                </div>

                <div id="voiceStatus" class="text-muted" style="margin-top:.75rem; text-align:center;"></div>

                <div id="voicePlayback" style="margin-top:.75rem; display:none; text-align:center;">
                    <audio id="recAudio" controls style="width:min(520px, 100%);"></audio>
                    <div style="margin-top:.5rem;">
                        <a id="recDownload" class="btn secondary" download="moeen_recording.webm" href="javascript:void(0)">⬇️ تنزيل التسجيل</a>
                    </div>
                </div>
            </div>
            </div>

            <div style="display:flex; gap:.75rem; flex-wrap:wrap; justify-content:center;">
                <button id="askSendBtn" class="btn primary">حلل الكلام</button>
                <button id="askClearBtn" class="btn secondary">مسح</button>
                <button id="askBackBtn" class="btn secondary">رجوع</button>
            </div>

            <div id="askResult" class="card" style="margin-top:1rem; display:none;">
                <h3 id="askResultTitle" style="margin-top:0;">النتيجة المبدئية</h3>
                <div id="askResultBody" class="text-muted"></div>

                <div style="display:flex; gap:.75rem; flex-wrap:wrap; justify-content:center; margin-top:.75rem;">
                    <button id="askStartDomainBtn" class="btn primary" style="display:none;">ابدأ الاختبار الأنسب</button>
                    <button id="askStartFullBtn" class="btn secondary">ابدأ اختبار شامل</button>
                </div>
            </div>
        </div>
    </section>

    <section id="setup">
        <div class="card" style="max-width: 500px; margin: 0 auto;">
            <h2 id="setupTitle"></h2>
            <p id="setupSub"></p>
            
            <div class="input-group">
                <input type="text" id="nameInput" placeholder="" />
            </div>
            <div class="input-group" style="display: flex; gap: 1rem;">
                <input type="number" id="ageInput" placeholder="" style="flex-grow: 1;" min="1" max="100"/>
                <select id="genderInput" style="flex-grow: 1;">
                    <option value="" id="genderDefault"></option>
                    <option value="male" id="genderMale"></option>
                    <option value="female" id="genderFemale"></option>
                </select>
            </div>
            
            <hr style="margin: 1.5rem 0; border: 0; border-top: 1px solid var(--card-border);">

            <div class="input-group">
                <label id="modeLabel"></label>
                <div style="display: flex; gap: 1rem;">
                    <button data-mode="all" class="btn secondary mode-btn active" style="flex-grow: 1;" id="modeAll">شامل</button>
                    <button data-mode="single" class="btn secondary mode-btn" style="flex-grow: 1;" id="modeSingle">محور واحد</button>
                </div>
            </div>

            <div class="input-group" id="domainSelect" style="display: none;">
                <select id="domainInput"></select>
            </div>
            
            <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                <button class="btn secondary" style="flex-grow: 1;" onclick="app.showSection('welcome')" id="setupBackBtn">رجوع</button>
                <button id="startTestBtn" class="btn primary" style="flex-grow: 2;">بدء التقييم</button>
            </div>
        </div>
    </section>

    <section id="test">
        <div class="progress-container">
            <div id="progressBar"></div>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; font-weight: 500;">
            <span id="qCounter" style="color: var(--muted);"></span>
            <span id="qDomainBadge" style="opacity: 0;"></span>
        </div>

        <div id="qContainer">
            <div id="qTextContainer">
                <button id="ttsButton" class="btn secondary" style="width: auto; padding: 0.5rem 0.75rem; font-size: 1rem;" onclick="app.readQuestion()">🔊</button>
                <h3 id="qText"></h3>
            </div>
        </div>
        <div id="optionsContainer">
            </div>

        <div class="test-actions">
  <button id="prevBtn" class="btn secondary">السابق</button>
  <button id="skipBtn" class="btn secondary">تخطي</button>
  <button id="nextBtn" class="btn primary">التالي</button>
  <button id="reviewBtn" class="btn secondary">مراجعة</button>
</div>
    </section>

    <section id="review">
        <h2 id="reviewTitle"></h2>
        <p id="reviewSub"></p>

        <div class="card">
            <div id="reviewSummary" class="text-muted" style="margin-bottom: .75rem;"></div>
            <div id="reviewList"></div>
        </div>

        <div class="review-actions">
            <button id="reviewBackBtn" class="btn secondary"></button>
            <button id="reviewFinishBtn" class="btn primary"></button>
        </div>
    </section>

    <section id="result">
        <div id="reportContent">
            <h2 id="resultTitle"></h2>
            <p id="resultMeta"></p>

            <div id="trendBox">
                <span id="trendText" style="margin: 0; padding: 0;"></span>
            </div>

            <div class="card" id="trendDetailsCard" style="display:none;">
                <h3 id="trendDetailsTitle" style="margin-top: 0;"></h3>
                <ul id="trendDetailsList" class="advice-list" style="margin-bottom:0;"></ul>
            </div>

            <div id="overallScorePill" class="pill"></div>

            
<div class="card" id="explainCard" style="display:none;">
  <h3 id="explainTitle" style="margin-top:0;">🔍 لماذا ظهرت هذه النتيجة؟</h3>
  <p id="explainSummary" class="text-muted" style="margin-top:.25rem; margin-bottom:.75rem;"></p>
  <ul id="explainList" class="advice-list" style="margin-bottom:0;"></ul>
</div>


            <div class="card" id="disclaimerCard">
                <h3 id="disclaimerTitle" style="margin-top: 0;"></h3>
                <p id="disclaimerText" class="text-muted" style="margin-bottom: 0;"></p>
            </div>

            <div class="card" id="recommendationsCard">
                <h3 id="recoTitle" style="margin-top: 0;"></h3>
                <p id="recoSummary" class="text-muted" style="margin-top: 0.25rem;"></p>
                <ul id="recoList" class="advice-list" style="margin-bottom: 0;"></ul>
            </div>

            <div class="card" id="chartCard">
                <h3 id="trendLabel" style="margin-top: 0;"></h3>
                <div id="resultChartContainer">
                    <canvas id="resultChart"></canvas>
                </div>
            </div>

            <div class="card" id="heatmapCard">
                <h3 id="heatmapTitle" style="margin-top: 0;"></h3>
                <div id="riskHeatmap">
                    </div>
            </div>

            <div id="supportiveContent" class="support-section">
                <div class="card" id="supportCard">
                    <h3 id="supportTitle"></h3>
                    <p id="supportIntro"></p>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                        <div>
                            <h4 id="helpLinesTitle" style="color: var(--text);"></h4>
                            <ul id="helpLinesList" class="helpline-list"></ul>
                        </div>
                        <div>
                            <h4 id="adviceTitle" style="color: var(--text);"></h4>
                            <ul class="advice-list">
                                <li>تناول طعاما صحيا ومارس الرياضة الخفيفة.</li>
                                <li>مارس تمارين التنفس العميق واليوجا.</li>
                                <li>تواصل مع صديق أو فرد من العائلة.</li>
                            </ul>
                        </div>
                    </div>
                    
                    <h4 id="quranTitle" style="color: var(--text); margin-top: 1.5rem;"></h4>
                    <div class="quran-box">
                        <p id="quranVerse1"></p>
                        <p id="quranVerse2"></p>
                    </div>
                </div>
            </div>
            
            <div class="card" id="doctorConnectCard" style="display:none; margin-top: 1rem;">
  <h3 id="docConnectTitle" style="margin-top:0;">🩺 تواصل مع مختص</h3>
  <p id="docConnectSub" class="text-muted" style="margin-top:.25rem;">
    معين لا يُغني عن الطبيب. لو حابب، جهّزنا لك رسالة مختصرة تقدر تبعتها لدكتور عبر واتساب أو إيميل.
  </p>

  <div class="card flat" style="margin-top:12px;">
    <h4 style="margin:0 0 8px 0;">📄 رسالة إحالة مختصرة</h4>
    <textarea id="docReferralText" style="width:100%; min-height:120px; resize:vertical;" readonly></textarea>
    <div style="display:flex; gap:10px; justify-content:flex-end; flex-wrap:wrap; margin-top:10px;">
      <button class="btn secondary" id="docCopyBtn" type="button">📋 نسخ الرسالة</button>
      <a class="btn" id="docWhatsappBtn" target="_blank" rel="noopener">واتساب</a>
      <a class="btn secondary" id="docEmailBtn">إيميل</a>
    </div>
  </div>

  <div class="card flat" style="margin-top:12px;">
  <h4 style="margin:0 0 8px 0;">🔎 دليل الأطباء داخل Moa'een (Demo)</h4>

  <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
    <input id="docCityInput" placeholder="المحافظة/المدينة" />
    <select id="docSpecSelect">
      <option value="psychiatrist">طبيب نفسي</option>
      <option value="psychologist">أخصائي نفسي (جلسات/CBT)</option>
      <option value="counselor">إرشاد/استشارات</option>
    </select>
  </div>

  <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-top:10px;">
    <select id="docFeeSelect">
      <option value="any">أي سعر</option>
      <option value="0-200">0 - 200</option>
      <option value="200-400">200 - 400</option>
      <option value="400-800">400 - 800</option>
      <option value="800+">800+</option>
    </select>
    <input id="docSearchInput" placeholder="بحث بالاسم/العيادة" />
  </div>

  <div id="docDirectoryList" style="margin-top:12px; display:grid; gap:12px;"></div>

  <div style="display:flex; gap:10px; justify-content:flex-end; flex-wrap:wrap; margin-top:10px;">
    <a class="btn secondary" id="docExternalSearchBtn" target="_blank" rel="noopener">بحث خارجي (اختياري)</a>
  </div>

  <p class="text-muted" style="margin:10px 0 0 0; font-size:.95rem;">
    هذا دليل Demo للعرض. في النسخة الكاملة يمكن ربطه بقاعدة بيانات على Railway لإضافة/تحديث الدكاترة والحجز.
  </p>
</div>
</div>

<div id="breathingWidget" 

        </div>
    </section>
    
    <section id="history">
        <h2 id="historyTitle"></h2>
        <p id="historySub"></p>

        <div class="card" style="margin-bottom: 1.5rem;">
            <h3 id="historyChartTitle" style="margin-top: 0; color: var(--accent-main); text-align: center;"></h3>
            <div style="height: 250px; width: 100%;">
                <canvas id="historyTrendChart"></canvas>
            </div>
        </div>
        <div id="historyList">
            </div>

        <div style="margin-top: 2rem; text-align: center;">
            <button class="btn secondary" style="min-width: 150px;" onclick="app.showSection('welcome')" id="historyBackBtn">رجوع</button>
            <button class="btn secondary" style="min-width: 150px; margin-left: 1rem;" onclick="app.exportAllHistory()" id="exportBtn">تصدير</button>
            <button class="btn primary" style="min-width: 150px; margin-left: 1rem;" onclick="app.exportAllHistoryCSV()" id="exportCsvBtn">تصدير CSV</button>
        </div>
    </section>


<section id="quick" dir="rtl">
  <div class="card" style="max-width: 760px; margin: 0 auto;">
    <h2 id="quickTitle">فحص سريع</h2>
    <p id="quickSub" class="text-muted">جاوب 5 أسئلة سريعة (نعم/لا) عشان نحدد أنسب اختبار.</p>

    <div id="quickForm" class="card" style="margin-top:1rem;">
      <div class="input-group">
        <label>1) هل القلق/التوتر موجود معظم الأيام؟</label>
        <select id="q1"><option value="">اختر</option><option value="y">نعم</option><option value="n">لا</option></select>
      </div>
      <div class="input-group">
        <label>2) هل في حزن/فقدان شغف أو طاقة لفترة مستمرة؟</label>
        <select id="q2"><option value="">اختر</option><option value="y">نعم</option><option value="n">لا</option></select>
      </div>
      <div class="input-group">
        <label>3) هل في وساوس أو أفعال قهرية بتتكرر غصب عنك؟</label>
        <select id="q3"><option value="">اختر</option><option value="y">نعم</option><option value="n">لا</option></select>
      </div>
      <div class="input-group">
        <label>4) هل في كوابيس/فلاشباك/تجنب بعد موقف صعب أو صدمة؟</label>
        <select id="q4"><option value="">اختر</option><option value="y">نعم</option><option value="n">لا</option></select>
      </div>
      <div class="input-group">
        <label>5) هل الأعراض مأثرة على نومك/دراستك/شغلك؟</label>
        <select id="q5"><option value="">اختر</option><option value="y">نعم</option><option value="n">لا</option></select>
      </div>

      <div style="display:flex; gap:.75rem; flex-wrap:wrap; justify-content:center; margin-top:.75rem;">
        <button id="quickRunBtn" class="btn primary">طلع النتيجة</button>
        <button id="quickBackBtn" class="btn secondary">رجوع</button>
      </div>
    </div>

    <div id="quickResult" class="card" style="margin-top:1rem; display:none;"></div>
  </div>
</section>

<section id="mood" dir="rtl">
  <div class="card" style="max-width: 760px; margin: 0 auto;">
    <h2 id="moodTitle">مزاجي اليوم</h2>
    <p id="moodSub" class="text-muted">سجل مزاجك اليومي (0–10) عشان نشوف الاتجاه مع الوقت.</p>

    <div class="card" style="margin-top:1rem;">
      <div class="input-group">
        <label id="moodLabel">مزاجي النهارده (0 أسوأ — 10 أفضل)</label>
        <input id="moodValue" type="range" min="0" max="10" step="1" value="5" />
        <div style="text-align:center; font-weight:700; margin-top:.25rem;"><span id="moodValueShow">5</span>/10</div>
      </div>

      <div class="input-group">
        <label id="moodNoteLabel">ملاحظة بسيطة (اختياري)</label>
        <input id="moodNote" type="text" placeholder="مثال: قلة نوم / ضغط امتحانات..." />
      </div>

      <div style="display:flex; gap:.75rem; flex-wrap:wrap; justify-content:center; margin-top:.75rem;">
        <button id="moodSaveBtn" class="btn primary">حفظ</button>
        <button id="moodBackBtn" class="btn secondary">رجوع</button>
      </div>
    </div>

    <div class="card" style="margin-top:1rem;">
      <h3 style="margin-top:0;">الاتجاه</h3>
      <canvas id="moodChart" height="120"></canvas>
      <div id="moodHints" class="text-muted" style="margin-top:.5rem;"></div>
    </div>
  </div>
</section>

<section id="appointments" dir="rtl">
  <div class="container">
    <div class="card">
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap;">
        <h2 id="apptTitle" style="margin:0;">📅 مواعيدي</h2>
        <button id="apptBackBtn" class="btn secondary" type="button">⬅️ رجوع</button>
      </div>
      <p id="apptSub" class="text-muted" style="margin-top:.35rem;">
        هنا هتلاقي كل الحجوزات والاستشارات عن بعد اللي عملتها من خلال Moa'een.
      </p>
      <div id="apptList" style="display:grid; gap:12px; margin-top:14px;"></div>
      <div class="text-muted" id="apptEmpty" style="text-align:center; margin-top:14px; display:none;">
        لا يوجد مواعيد حاليًا.
      </div>
    </div>
  </div>
</section>

<section id="ethics" dir="rtl">
  <div class="card" style="max-width: 760px; margin: 0 auto;">
    <h2 id="ethicsTitle">الأمان والأخلاقيات</h2>
    <p class="text-muted" id="ethicsSub">صفحة مختصرة توضح حدود النظام وكيف بيحمي المستخدم.</p>

    <div class="card" style="margin-top:1rem;">
      <h3 style="margin-top:0;">حدود النظام</h3>
      <ul>
        <li>ده تقييم ذاتي وتعليمي، <b>مش تشخيص طبي</b>.</li>
        <li>النتائج تعتمد على إجاباتك/كلامك وقد تحتوي على عدم دقة.</li>
        <li>لو الأعراض شديدة أو مستمرة + أسبوعين أو مأثرة على حياتك: الأفضل استشارة مختص.</li>
      </ul>
      <h3>Strict Safety</h3>
      <ul>
        <li>لو ظهر أي مؤشر إيذاء نفس/انتحار: النظام يقدم إرشاد طوارئ فوري ويوقف التحليل التفصيلي.</li>
        <li>لا يتم طلب بيانات حساسة.</li>
      </ul>
      <h3>دعم إيماني خفيف (اختياري)</h3>
      <p class="text-muted">بنضيف تذكير لطيف (ذكر/دعاء قصير) بدون وعظ أو فتاوى.</p>

      <div style="display:flex; gap:.75rem; flex-wrap:wrap; justify-content:center; margin-top:.75rem;">
        <button id="ethicsBackBtn" class="btn secondary">رجوع</button>
      </div>
    </div>
  </div>
</section>

</main>

<div id="actionBar">
    <button id="downloadPDFBtn" class="btn primary">طباعة / PDF</button>
    <button id="newDiagnosisBtn" class="btn secondary">تقييم جديد</button>
</div>


<script>
// --- CONFIGURATION & CLINICAL CUTOFFS ---

const CONFIG = {
  domains: {
    depression: { ar: "الاكتئاب", en: "Depression", scale: "PHQ-9" },
    anxiety:    { ar: "القلق", en: "Anxiety", scale: "GAD-7" },
    ocd:        { ar: "الوسواس", en: "OCD", scale: "Y-BOCS" },
    trauma:     { ar: "الصدمة", en: "PTSD", scale: "PCL-5" }
  },
  options: [
    { val: 0, ar: "أبدا", en: "Never", emoji: "😊" },
    { val: 1, ar: "نادرا", en: "Rarely", emoji: "😐" },
    { val: 2, ar: "أحيانا", en: "Sometimes", emoji: "😰" },
    { val: 3, ar: "دائما", en: "Always", emoji: "😫" } 
  ],
  // Clinical Cutoff Scores based on percentage (Max score 30 per domain)
  // Scores adapted for 0-100% scale for visualization purposes.
  cutoffs: {
    // 0-14%: Stable, 15-30%: Mild, 31-50%: Moderate, 51%+: Severe
    mild: 15,
    moderate: 30,
    severe: 50,
    critical: 75
  }
};

const QUESTIONS = [
  // --- DEPRESSION (10) ---
  { id:1, d:'depression', ar:"فقدان المتعة بالأنشطة التي كنت تستمتع بها؟", en:"Loss of pleasure in activities you once enjoyed?" },
  { id:2, d:'depression', ar:"شعور بالحزن أو الكآبة أو الفراغ معظم الوقت؟", en:"Feeling sad, depressed, or empty most of the time?" },
  { id:3, d:'depression', ar:"صعوبة في النوم أو النوم لفترات طويلة جدا؟", en:"Difficulty sleeping or sleeping too much?" },
  { id:4, d:'depression', ar:"تغير في الشهية أو الوزن (زيادة أو نقصان ملحوظ)؟", en:"Change in appetite or noticeable weight change?" },
  { id:5, d:'depression', ar:"الشعور بالتعب أو انخفاض الطاقة بشكل شبه يومي؟", en:"Feeling tired or having low energy almost every day?" },
  { id:6, d:'depression', ar:"الشعور بانعدام القيمة أو الذنب المفرط؟", en:"Feeling worthless or excessive guilt?" },
  { id:7, d:'depression', ar:"صعوبة في التركيز أو اتخاذ القرارات؟", en:"Difficulty concentrating or making decisions?" },
  { id:8, d:'depression', ar:"الحركة أو الكلام أبطأ من المعتاد؟", en:"Movement or speech being noticeably slower than usual?" },
  { id:9, d:'depression', ar:"أفكار متكررة حول الموت أو إيذاء النفس؟", en:"Recurrent thoughts of death or self-harm?" },
  { id:10, d:'depression', ar:"فقدان الاهتمام بالتفاعل الاجتماعي؟", en:"Loss of interest in social interaction?" },
  
  // --- ANXIETY (10) ---
  { id:11, d:'anxiety', ar:"قلق مفرط يصعب السيطرة عليه حول أمور مختلفة؟", en:"Excessive worry that is hard to control about various things?" },
  { id:12, d:'anxiety', ar:"الشعور بالتوتر أو العصبية أو عدم القدرة على الاسترخاء؟", en:"Feeling tense, nervous, or unable to relax?" },
  { id:13, d:'anxiety', ar:"صعوبة في النوم بسبب القلق؟", en:"Difficulty falling or staying asleep due to worry?" },
  { id:14, d:'anxiety', ar:"نوبات هلع أو خوف مفاجئ وشديد؟", en:"Sudden, intense episodes of panic or fear?" },
  { id:15, d:'anxiety', ar:"الشعور بأن قلبك يخفق بسرعة أو أنك تتعرق بغزارة؟", en:"Feeling your heart pound or excessive sweating?" },
  { id:16, d:'anxiety', ar:"الخوف من المواقف الاجتماعية أو الأماكن المزدحمة؟", en:"Fear of social situations or crowded places?" },
  { id:17, d:'anxiety', ar:"الشعور بضيق في التنفس أو الاختناق؟", en:"Feeling short of breath or choking sensations?" },
  { id:18, d:'anxiety', ar:"آلام أو أوجاع جسدية لا سبب لها؟", en:"Unexplained physical aches or pains?" },
  { id:19, d:'anxiety', ar:"تجنب الأنشطة أو الأماكن خوفا من القلق؟", en:"Avoiding activities or places out of fear of anxiety?" },
  { id:20, d:'anxiety', ar:"سهولة الاستثارة أو الغضب؟", en:"Being easily irritated or angry?" },

  // --- OCD (10) ---
  { id:21, d:'ocd', ar:"أفكار أو صور متكررة وغير مرغوب فيها تقتحم ذهنك؟", en:"Recurrent, unwanted thoughts or images intruding your mind?" },
  { id:22, d:'ocd', ar:"القلق المفرط بشأن النظافة والتلوث والجراثيم؟", en:"Excessive preoccupation with cleanliness, contamination, or germs?" },
  { id:23, d:'ocd', ar:"الحاجة إلى تكرار أفعال معينة (مثل الغسيل أو التحقق)؟", en:"A need to repeat certain actions (like washing or checking)?" },
  { id:24, d:'ocd', ar:"الخوف من ارتكاب أخطاء فادحة أو التسبب بالضرر للآخرين؟", en:"Fear of making terrible mistakes or harming others?" },
  { id:25, d:'ocd', ar:"الحاجة إلى ترتيب الأشياء بطريقة مثالية أو متناظرة؟", en:"Needing to arrange things in a perfect or symmetrical way?" },
  { id:26, d:'ocd', ar:"قضاء وقت طويل في أداء الطقوس القهرية؟", en:"Spending a lot of time performing compulsive rituals?" },
  { id:27, d:'ocd', ar:"صعوبة في التخلص من الأشياء التي لا تحتاجها (الاكتناز القهري)؟", en:"Difficulty discarding items you don't need (compulsive hoarding)?" },
  { id:28, d:'ocd', ar:"التحقق المتكرر من الأبواب أو الأجهزة أو المفاتيح؟", en:"Repeatedly checking doors, appliances, or switches?" },
  { id:29, d:'ocd', ar:"الشك في القيام بشيء صحيح أو اكتمال المهام؟", en:"Doubting whether something was done correctly or tasks are complete?" },
  { id:30, d:'ocd', ar:"الشعور بالانزعاج الشديد إذا لم تتم الأمور 'بالطريقة الصحيحة'؟", en:"Feeling extreme distress if things are not 'just right'?" },

  // --- TRAUMA/PTSD (10) ---
  { id:31, d:'trauma', ar:"ذكريات مؤلمة أو كوابيس متكررة حول حدث صادم؟", en:"Recurrent distressing memories or nightmares of a traumatic event?" },
  { id:32, d:'trauma', ar:"الشعور وكأن الحدث الصادم يحدث مجددا (Flashbacks)؟", en:"Feeling as if the traumatic event is happening again (flashbacks)?" },
  { id:33, d:'trauma', ar:"تجنب الأماكن أو الأشخاص أو الأحاديث التي تذكرك بالحدث؟", en:"Avoiding places, people, or conversations that remind you of the event?" },
  { id:34, d:'trauma', ar:"الشعور بالابتعاد أو الانفصال عن الآخرين؟", en:"Feeling detached or estranged from others?" },
  { id:35, d:'trauma', ar:"صعوبة في تذكر تفاصيل مهمة من الحدث؟", en:"Difficulty remembering important aspects of the event?" },
  { id:36, d:'trauma', ar:"الشعور بالخدر العاطفي أو عدم القدرة على الشعور بالسعادة؟", en:"Emotional numbness or inability to feel happiness?" },
  { id:37, d:'trauma', ar:"فرط اليقظة أو سهولة الفزع والخوف؟", en:"Hypervigilance, being easily startled or scared?" },
  { id:38, d:'trauma', ar:"صعوبة في النوم أو التركيز بسبب التوتر؟", en:"Difficulty sleeping or concentrating due to tension?" },
  { id:39, d:'trauma', ar:"التهيج أو نوبات الغضب المفاجئة؟", en:"Irritability or sudden outbursts of anger?" },
  { id:40, d:'trauma', ar:"نظرة سلبية للغاية عن نفسك أو عن المستقبل؟", en:"Having a very negative view of yourself or the future?" },
];

// --- Persistence keys (multi-user + custom config) ---
const STORAGE = {
  lang: 'ps_lang',
  theme: 'ps_theme',
  users: 'ps_users',
  currentUser: 'ps_current_user',
  config: 'ps_custom_config',
  disclaimerOk: 'ps_disclaimer_ok_v1'
};

function uid() {
  return (crypto?.randomUUID?.() || ('u_' + Math.random().toString(16).slice(2) + Date.now().toString(16)));
}


function escapeHtml(str){
  return String(str || '')
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'","&#039;");
}

function safeJsonParse(str, fallback) {
  try { return JSON.parse(str); } catch { return fallback; }
}


// Safe storage wrapper (works even on file:// or content:// where localStorage may fail)
const storage = (() => {
  try {
    const ls = window.localStorage;
    const t = '__moeen_test__';
    ls.setItem(t, '1');
    ls.removeItem(t);
    return ls;
  } catch (e) {
    const mem = new Map();
    return {
      getItem: (k) => (mem.has(k) ? mem.get(k) : null),
      setItem: (k, v) => mem.set(k, String(v)),
      removeItem: (k) => mem.delete(k),
      key: (i) => Array.from(mem.keys())[i] || null,
      get length() { return mem.size; }
    };
  }
})();

function escapeScriptEnd(str) {
  // Prevent accidental premature </scr'+'ipt> termination inside template strings
  return String(str).replace(/<\/script/gi, '<\\/script');
}



function deepClone(obj){
  // structuredClone is not supported on some Android/WebView versions
  if (typeof structuredClone === 'function') return structuredClone(obj);
  return JSON.parse(JSON.stringify(obj));
}
// Default full model (can be overridden by Admin JSON)
const DEFAULT_MODEL = {
  config: CONFIG,
  questions: QUESTIONS
};

function loadModel() {
  const raw = storage.getItem(STORAGE.config);
  if (!raw) {
    const m = deepClone(DEFAULT_MODEL);
    if (Array.isArray(m.questions)) m.questions = m.questions.map(q => q && typeof q==='object' ? ({...q, id: String(q.id)}) : q);
    return m;
  }
  const custom = safeJsonParse(raw, null);
  if (!custom || typeof custom !== 'object') {
    const m = deepClone(DEFAULT_MODEL);
    if (Array.isArray(m.questions)) m.questions = m.questions.map(q => q && typeof q==='object' ? ({...q, id: String(q.id)}) : q);
    return m;
  }

  // Soft-merge: allow overriding config and/or questions.
  const merged = deepClone(DEFAULT_MODEL);
  if (custom.config && typeof custom.config === 'object') merged.config = custom.config;
  if (Array.isArray(custom.questions)) merged.questions = custom.questions;

  // Normalize question ids to strings (prevents init crash on mobile/WebView)
  if (Array.isArray(merged.questions)) {
    merged.questions = merged.questions.map(q => q && typeof q === 'object'
      ? ({ ...q, id: String(q.id) })
      : q
    );
  }
  return merged;
}

function validateModel(model) {
  if (!model || typeof model !== 'object') throw new Error('Invalid model');
  const cfg = model.config;
  if (!cfg || typeof cfg !== 'object') throw new Error('Invalid config');
  if (!cfg.domains || typeof cfg.domains !== 'object') throw new Error('Missing domains');
  if (!Array.isArray(cfg.options) || cfg.options.length < 2) throw new Error('Missing options');

  // options: [{val, ar, en}]
  cfg.options.forEach((o, i) => {
    if (!o || typeof o !== 'object') throw new Error('Invalid option at ' + i);
    if (typeof o.val !== 'number') throw new Error('Option.val must be number at ' + i);
    if (typeof o.ar !== 'string' || typeof o.en !== 'string') throw new Error('Option labels must be strings at ' + i);
  });

  // domains: {key:{ar,en,abbr?}}
  const domainKeys = Object.keys(cfg.domains);
  if (domainKeys.length === 0) throw new Error('No domains defined');
  domainKeys.forEach(k => {
    const d = cfg.domains[k];
    if (!d || typeof d !== 'object') throw new Error('Invalid domain: ' + k);
    if (typeof d.ar !== 'string' || typeof d.en !== 'string') throw new Error('Domain labels missing: ' + k);
  });

  if (!Array.isArray(model.questions) || model.questions.length < 5) throw new Error('Questions missing');

  // questions: {id,d,ar,en}
  model.questions.forEach((q, i) => {
    if (!q || typeof q !== 'object') throw new Error('Invalid question at ' + i);
    if (typeof q.id !== 'string' && typeof q.id !== 'number') throw new Error('Question.id missing at ' + i);
    // normalize id to string for consistent storage/lookup
    q.id = String(q.id);
    if (typeof q.d !== 'string' || !cfg.domains[q.d]) throw new Error('Question domain invalid at ' + i);
    if (typeof q.ar !== 'string' || typeof q.en !== 'string') throw new Error('Question text missing at ' + i);
  });

  return true;
}

function downloadText(filename, text, mime='application/json') {
  const blob = new Blob([text], {type: mime});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); }, 0);
}

// --- Minimal offline PDF generator (no external libs) ---
// Supports basic multi-line text. (Good enough for reports.)
function pdfEscape(s){ return String(s).replace(/\\/g,'\\\\').replace(/\(/g,'\\(').replace(/\)/g,'\\)'); }

function makeSimplePDF(lines, opts={}) {
  const {
    title='Mo\'een Report',
    rtl=false
  } = opts;

  // Very simple single-page PDF with Helvetica.
  // PDF coordinates: origin bottom-left. We'll draw from top down.
  const pageW = 595.28, pageH = 841.89; // A4
  const margin = 50;
  let y = pageH - margin;

  const content = [];
  const fontSizeTitle = 16;
  const fontSize = 11;
  const leading = 15;

  content.push('BT');
  content.push('/F1 ' + fontSizeTitle + ' Tf');
  content.push(margin + ' ' + y + ' Td');
  content.push('(' + pdfEscape(title) + ') Tj');
  content.push('ET');
  y -= 28;

  content.push('BT');
  content.push('/F1 ' + fontSize + ' Tf');
  content.push(margin + ' ' + y + ' Td');

  for (const line of lines) {
    const text = rtl ? line.split('').reverse().join('') : line;
    content.push('(' + pdfEscape(text) + ') Tj');
    content.push('0 -' + leading + ' Td');
  }

  content.push('ET');

  const stream = content.join('\n');
  const objects = [];
  const xref = [];
  let offset = 0;

  function addObj(str){
    xref.push(offset);
    objects.push(str);
    offset += (str.length + 1); // +newline
  }

  const header = '%PDF-1.4';
  offset += header.length + 1;

  // 1: catalog
  addObj('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj');
  // 2: pages
  addObj('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj');
  // 3: page
  addObj('3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ' + pageW + ' ' + pageH + '] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj');
  // 4: font
  addObj('4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj');
  // 5: contents stream
  addObj('5 0 obj\n<< /Length ' + stream.length + ' >>\nstream\n' + stream + '\nendstream\nendobj');

  const xrefOffset = offset;
  const xrefTable = ['xref', '0 ' + (objects.length + 1), '0000000000 65535 f '];
  for (const off of xref) {
    xrefTable.push(String(off).padStart(10,'0') + ' 00000 n ');
  }
  const trailer = [
    'trailer',
    '<< /Size ' + (objects.length + 1) + ' /Root 1 0 R >>',
    'startxref',
    String(xrefOffset),
    '%%EOF'
  ];

  const pdf = [header, ...objects, ...xrefTable, ...trailer].join('\n');
  return new Blob([pdf], {type:'application/pdf'});
}


// --- END this.model.configURATION ---

// --- HELPERS (Severity Mapping) ---
function getSeverity(score, model) {
  const c = model?.config?.cutoffs;
  if (!c) return 'good';
  if (score >= c.severe) return 'bad';
  if (score >= c.moderate) return 'warn';
  return 'good';
}

function getClinicalLevel(score, lang, model) {
  const t = {
    ar: { stable: 'مستقر', mild: 'خفيف', moderate: 'متوسط', severe: 'شديد' },
    en: { stable: 'Stable', mild: 'Mild', moderate: 'Moderate', severe: 'Severe' }
  };
  const L = (lang === 'ar' || lang === 'en') ? lang : 'en';
  const c = model?.config?.cutoffs;
  if (!c) return t[L].stable;
  if (score >= c.severe) return t[L].severe;
  if (score >= c.moderate) return t[L].moderate;
  if (score >= c.mild) return t[L].mild;
  return t[L].stable;
}

// --- APP CORE CLASS ---
class MoeenApp {
  constructor() {
    this.lang = storage.getItem(STORAGE.lang) || 'ar';
    this.theme = storage.getItem(STORAGE.theme) || 'dark';
    this.mode = 'all'; 
    this.targetDomain = null;
    this.answers = {};
    this.chart = null;
    this.historyChart = null; // NEW: Initialize history chart instance
    this.currentReport = null;
    
    // Load questionnaire model (can be overridden via Admin JSON)
    this.model = loadModel();
    try { validateModel(this.model); } catch(e) { console.warn(e); this.model = deepClone(DEFAULT_MODEL); }

    
    this.init();
  }

  $(id) { return document.getElementById(id); }

  // --- Ask Mo'een (Free-text triage) ---
  normalizeText(s){
    return String(s||'')
      .toLowerCase()
      .replace(/[إأآا]/g,'ا')
      .replace(/ى/g,'ي')
      .replace(/ة/g,'ه')
      .replace(/[^\p{L}\p{N}\s]+/gu,' ')
      .replace(/\s+/g,' ')
      .trim();
  }

  getKeywordModel(){
    return {
      depression: [
        'حزين','كئيب','اكتئاب','مفيش طاقه','تعبان','ملل','مش مستمتع','فقدان شغف','بعيط','ياس',
        'loss of interest','depressed','sad','hopeless','no energy','fatigue'
      ],
      anxiety: [
        'قلق','متوتر','توتر','خوف','هلع','نوبه هلع','panic','heart racing','خفقان','مضايق','مش قادر استرخي',
        'worry','anxious','nervous','panic','restless'
      ],
      ocd: [
        'وسواس','افكار ملحه','قهري','بتاكد كتير','بتأكد كتير','اغسل ايدي كتير','غسل ايدي','تنضيف','جراثيم','ترتيب','تماثل','symmetry',
        'obsession','compulsion','checking','washing','contamination'
      ],
      trauma: [
        'صدمة','حادث','اعتداء','تحرش','flashback','كوابيس','ذكريات','بتجنب','تجنب','فزع','hypervigilance','متيقظ',
        'trauma','ptsd','nightmares','flashbacks','avoidance'
      ],
      critical: [
        'انتحار','اموت','ااذي نفسي','اذي نفسي','أذي نفسي','مش عايز اعيش','مش عايز أعيش','self harm','suicide','kill myself'
      ],
      intensity: [
        'دايما','طول الوقت','بستمرار','باستمرار','كل يوم','اغلب الوقت','معظم الوقت',
        'every day','all the time','most of the time','constantly'
      ],
      duration: [
        'اسبوع','اسبوعين','3 اسابيع','4 اسابيع','شهر','شهرين','3 شهور','سنه','سنتين',
        'week','weeks','month','months','year','years'
      ],
      sleep: ['مش بنام','نومي','أرق','ارهاق','كوابيس','insomnia','sleep'],
    };
  }

  domainLabel(domainKey){
    const d = (this.model && this.model.config && this.model.config.domains && this.model.config.domains[domainKey])
      ? this.model.config.domains[domainKey][this.lang]
      : null;
    return d || domainKey;
  }

  analyzeFreeText(text){
    const raw = String(text||'');
    const t = this.normalizeText(raw);
    const km = this.getKeywordModel();

    const scores = { depression:0, anxiety:0, ocd:0, trauma:0 };
    const hits = { depression:[], anxiety:[], ocd:[], trauma:[] };

    const criticalHit = km.critical.some(k => t.includes(this.normalizeText(k)));

    // keyword scoring
    for (const d of ['depression','anxiety','ocd','trauma']){
      for (const k of km[d]){
        const kk = this.normalizeText(k);
        if (kk && t.includes(kk)) { scores[d] += 10; hits[d].push(k); }
      }
    }

    // intensity boost
    const intensityBoost = km.intensity.some(k => t.includes(this.normalizeText(k))) ? 10 : 0;
    for (const d of Object.keys(scores)) scores[d] += intensityBoost;

    // sleep boost (often relates to depression/anxiety/trauma)
    const sleepBoost = km.sleep.some(k => t.includes(this.normalizeText(k))) ? 5 : 0;
    scores.depression += sleepBoost; scores.anxiety += sleepBoost; scores.trauma += sleepBoost;

    // duration boost
    const durationBoost = km.duration.some(k => t.includes(this.normalizeText(k))) ? 5 : 0;
    for (const d of Object.keys(scores)) scores[d] += durationBoost;

    // clamp 0..100
    for (const d of Object.keys(scores)) scores[d] = Math.max(0, Math.min(100, scores[d]));

    const top = Object.entries(scores).sort((a,b)=>b[1]-a[1])[0];
    const topDomain = top[1] > 0 ? top[0] : null;

    return { scores, hits, topDomain, criticalHit };
  }

  followUpQuestions(domainKey){
    const ar = {
      depression: [
        "هل فقدت الاهتمام بالحاجات اللي كنت بتحبها؟",
        "هل نومك اتلخبط أو عندك أرق؟",
        "هل بتحس بتعب/انعدام طاقة أغلب اليوم؟"
      ],
      anxiety: [
        "هل القلق مأثر على شغلك/دراستك أو حياتك اليومية؟",
        "هل بيجيلك توتر أو خفقان مفاجئ؟",
        "هل بتفكر كتير في أسوأ الاحتمالات؟"
      ],
      ocd: [
        "هل بتكرر أفعال (تأكيد/غسيل/ترتيب) رغم إنك عارف إنها زيادة؟",
        "هل الأفكار الملحة بترجع حتى لو بتحاول تمنعها؟",
        "هل ده بياخد وقت كبير من يومك أو بيعطلك؟"
      ],
      trauma: [
        "هل بتجيلك ذكريات/صور مزعجة فجأة (Flashbacks)؟",
        "هل بتتجنب أماكن/أشخاص/مواقف بتفكرك بالحدث؟",
        "هل نومك فيه كوابيس أو فزع؟"
      ]
    };
    const en = {
      depression: [
        "Have you lost interest in things you used to enjoy?",
        "Has your sleep been disrupted (insomnia/too much sleep)?",
        "Do you feel tired or low-energy most of the day?"
      ],
      anxiety: [
        "Is worry affecting your daily life (work/study)?",
        "Do you get sudden tension or heart racing?",
        "Do you often imagine the worst outcomes?"
      ],
      ocd: [
        "Do you repeat actions (checking/washing/ordering) even if you know it's excessive?",
        "Do intrusive thoughts keep coming back despite resistance?",
        "Does it take a lot of your time or impair functioning?"
      ],
      trauma: [
        "Do you get upsetting memories/images suddenly (flashbacks)?",
        "Do you avoid places/people/situations linked to the event?",
        "Do you have nightmares or sleep-related distress?"
      ]
    };
    const bank = this.lang === 'ar' ? ar : en;
    return bank[domainKey] || [];
  }

  renderAskResult(analysis){
    const box = this.$('askResult');
    const body = this.$('askResultBody');
    const startDomainBtn = this.$('askStartDomainBtn');
    const t = this.langText;

    box.style.display = 'block';

    // Safety first
    if (analysis.criticalHit){
      body.innerHTML = `
        <div style="padding:.9rem; border:1px solid var(--bad); border-radius:14px; background: rgba(248,113,113,.12); color: var(--text);">
          <b>${t.askDangerTitle}</b>
          <div style="margin-top:.5rem; line-height:1.7">${t.askDangerBody}</div>
        </div>
      `;
      startDomainBtn.style.display = 'none';
      return;
    }

    const rows = ['depression','anxiety','ocd','trauma'].map(d=>{
      const s = analysis.scores[d] || 0;
      return `<div style="display:flex; justify-content:space-between; padding:.35rem 0; border-bottom:1px dashed var(--card-border);">
        <span>${this.domainLabel(d)}</span><b>${s}%</b>
      </div>`;
    }).join('');

    if (!analysis.topDomain){
      body.innerHTML = `
        <div style="color: var(--text);">${t.askNoClear}</div>
        <div style="margin-top:.6rem;" class="text-muted">${t.askHintMore}</div>
        <div style="margin-top:.75rem;">${rows}</div>
      `;
      startDomainBtn.style.display = 'none';
      return;
    }

    const topName = this.domainLabel(analysis.topDomain);
    const qs = this.followUpQuestions(analysis.topDomain);

    const followHtml = qs.map((q, i)=>`
      <div class="card flat" style="padding:.75rem; margin:.5rem 0;">
        <div style="margin-bottom:.5rem; color: var(--text);">${i+1}) ${q}</div>
        <div style="display:flex; gap:.75rem; justify-content:center; flex-wrap:wrap;">
          <label class="pill">
            <input type="radio" name="fu_${i}" value="yes"> ${t.yes}
          </label>
          <label class="pill">
            <input type="radio" name="fu_${i}" value="no" checked> ${t.no}
          </label>
        </div>
      </div>
    `).join('');

    body.innerHTML = `
      <div style="color: var(--text);">
        ${t.askTopPrefix} <b>${topName}</b>
        <div class="text-muted" style="margin-top:.35rem;">${t.askDisclaimer}</div>
      </div>
      <div style="margin-top:.75rem;">${rows}</div>

      <div style="margin-top:1rem;">
        <h4 style="margin:.25rem 0;" id="askFollowTitle">${t.askFollowTitle}</h4>
        <div class="text-muted">${t.askFollowHint}</div>
        <div id="askFollowBox">${followHtml}</div>
        <div style="text-align:center; margin-top:.75rem;">
          <button id="askComputeBtn" class="btn secondary">${t.askComputeBtn}</button>
        </div>
      </div>
    `;

    // Initially show the domain start button (can still refine)
    startDomainBtn.style.display = 'inline-flex';
    startDomainBtn.textContent = `${t.askStartPrefix} ${topName}`;
    startDomainBtn.onclick = () => this.startSuggestedDomain(analysis.topDomain);
    
  }

  async callTriageAPI(userText){
    const text = String(userText || '').trim();
    if (text.length < 3) throw new Error('text too short');

    const controller = new AbortController();
    const timeoutMs = 20000;
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try{
      const r = await fetch('/api/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, lang: this.lang }),
        signal: controller.signal
      });

      if (!r.ok){
        const detail = await r.text().catch(()=> '');
        throw new Error('api error ' + r.status + (detail ? (': ' + detail.slice(0,200)) : ''));
      }

      const j = await r.json();
      if (!j || typeof j !== 'object') throw new Error('bad api response');
      return j;
    } finally {
      clearTimeout(timer);
    }
  }

  mapSuggestedTestToDomain(suggested, domainFallback){
    const s = String(suggested || '').toUpperCase();
    if (s === 'PHQ-9' || s === 'PHQ9') return 'depression';
    if (s === 'GAD-7' || s === 'GAD7') return 'anxiety';
    if (s === 'OCD') return 'ocd';
    if (s === 'PTSD') return 'trauma';
    if (s === 'FULL') return null;
    return domainFallback || null;
  }

  confidenceLabel(conf){
    const c = Math.max(0, Math.min(100, Number(conf)||0));
    if (c >= 80) return (this.lang === 'ar') ? 'عالية' : 'High';
    if (c >= 55) return (this.lang === 'ar') ? 'متوسطة' : 'Medium';
    return (this.lang === 'ar') ? 'منخفضة' : 'Low';
  }

  // Explainability: show key signals that drove the assessment (not a medical diagnosis)
  buildWhyFactors({domain, summary, scores, userText} = {}){
    const t = this.langText;
    const factors = [];
    const txt = String(userText || '').trim();

    // Duration / frequency cues
    const durationHit = /(اسبوع|اسبوعين|اسابيع|شهر|شهور|سنه|ايام|يومين|week|weeks|month|months|year|years)/i.test(txt);
    const freqHit = /(طول الوقت|اغلب الوقت|دايما|كل يوم|every day|all the time|most days)/i.test(txt);
    const sleepHit = /(نوم|ارَق|مش بنام|insomnia|sleep)/i.test(txt);
    const workHit = /(شغل|دراسه|جامعه|مذاكره|work|study|school)/i.test(txt);

    if (durationHit) factors.push((this.lang==='ar') ? 'ذكرت مدة/فترة واضحة للأعراض.' : 'You mentioned a clear duration/timeframe.');
    if (freqHit) factors.push((this.lang==='ar') ? 'في كلمات تدل على تكرار/استمرارية.' : 'There are cues of frequent/persistent symptoms.');
    if (sleepHit) factors.push((this.lang==='ar') ? 'ظهر تأثير على النوم.' : 'Sleep impact was mentioned.');
    if (workHit) factors.push((this.lang==='ar') ? 'ظهر تأثير على الشغل/الدراسة.' : 'Impact on work/study was mentioned.');

    // Local-score hints (when available)
    if (scores && typeof scores === 'object'){
      const entries = Object.entries(scores).filter(([,v])=>Number(v)>0).sort((a,b)=>b[1]-a[1]).slice(0,2);
      if (entries.length){
        const nice = entries.map(([d,v]) => `${this.domainLabel(d)}: ${v}%`).join(' • ');
        factors.push((this.lang==='ar') ? `مؤشرات محلية: ${nice}` : `Local signals: ${nice}`);
      }
    }

    // Summary as last factor
    if (summary){
      factors.push((this.lang==='ar') ? `الخلاصة: ${summary}` : `Summary: ${summary}`);
    }

    if (!factors.length){
      factors.push((this.lang==='ar') ? 'النص كان عام/قصير، فالتقييم اعتمد على مؤشرات محدودة.' : 'The text was brief/general, so the assessment used limited signals.');
    }

    // Add a short disclaimer line
    factors.push((this.lang==='ar') ? 'ملاحظة: ده تقييم ذاتي مبدئي، مش تشخيص طبي.' : 'Note: This is an initial self-assessment, not a medical diagnosis.');

    return factors;
  }

  openModal(title, htmlBody){
    // lightweight modal injected on-demand
    let backdrop = document.getElementById('moeenModalBackdrop');
    if (!backdrop){
      backdrop = document.createElement('div');
      backdrop.id = 'moeenModalBackdrop';
      backdrop.className = 'modal-backdrop';
      backdrop.innerHTML = `
        <div class="modal" role="dialog" aria-modal="true" style="max-width: 820px;">
          <div class="modal-header">
            <div class="modal-title" id="moeenModalTitle"></div>
            <button class="icon-btn" id="moeenModalClose" aria-label="Close">✕</button>
          </div>
          <div class="modal-body" id="moeenModalBody"></div>
          <div class="modal-footer">
            <button class="btn primary" id="moeenModalOk">${(this.lang==='ar')?'تمام':'OK'}</button>
          </div>
        </div>
      `;
      document.body.appendChild(backdrop);

      const close = () => backdrop.remove();
      backdrop.addEventListener('click', (e)=>{ if (e.target === backdrop) close(); });
      backdrop.querySelector('#moeenModalClose').addEventListener('click', close);
      backdrop.querySelector('#moeenModalOk').addEventListener('click', close);
    }

    backdrop.querySelector('#moeenModalTitle').textContent = title || '';
    backdrop.querySelector('#moeenModalBody').innerHTML = htmlBody || '';
  }

  generate7DayPlan(domain){
    const ar = {
      depression: [
        "اليوم 1: رتّب نومك (نام/اصحى في معاد ثابت قدر الإمكان).",
        "اليوم 2: مشي خفيف 10–15 دقيقة في ضوء النهار.",
        "اليوم 3: وجبة متوازنة + مياه كفاية.",
        "اليوم 4: مهمة واحدة صغيرة مؤجلة (حتى لو 10 دقايق).",
        "اليوم 5: تواصل مع شخص قريب ولو برسالة.",
        "اليوم 6: قلل سوشيال قبل النوم بساعة.",
        "اليوم 7: قيّم أسبوعك واكتب 3 حاجات تحسّنت ولو بسيط."
      ],
      anxiety: [
        "اليوم 1: تنفّس 4/6 مرتين يوميًا (3 دقائق).",
        "اليوم 2: قلّل الكافيين بعد العصر.",
        "اليوم 3: اكتب مخاوفك + (إيه أسوأ/أحسن/أقرب احتمال؟).",
        "اليوم 4: امشِ 10 دقائق مع تركيز على الحواس.",
        "اليوم 5: اقفل إشعارات غير مهمة ساعتين.",
        "اليوم 6: جرّب استرخاء عضلي 5 دقائق قبل النوم.",
        "اليوم 7: راجع محفزات القلق وخطوة صغيرة لتقليلها."
      ],
      ocd: [
        "اليوم 1: لاحظ الوسواس/الفعل القهري واكتب وقت حدوثه.",
        "اليوم 2: أجّل الفعل القهري 1–2 دقيقة (Delay).",
        "اليوم 3: قلّل التكرار مرة واحدة فقط (Reduce).",
        "اليوم 4: جرّب تعرّض بسيط بدون استجابة لمدة دقيقة (ERP خفيف).",
        "اليوم 5: راقب التقدم مش الكمال.",
        "اليوم 6: نام كويس لأن الإرهاق يزيد الوسواس.",
        "اليوم 7: لو الوسواس بيعطلك كثير: ناقش مختص (ERP علاج فعّال)."
      ],
      trauma: [
        "اليوم 1: ثبّت روتين نوم بسيط وابتعد عن المنبهات قبل النوم.",
        "اليوم 2: تمرين Grounding (5-4-3-2-1) مرة يوميًا.",
        "اليوم 3: كتابة قصيرة: 'أنا في أمان دلوقتي' + سببين.",
        "اليوم 4: حركة خفيفة 10 دقائق لتفريغ التوتر.",
        "اليوم 5: قلّل تجنب بسيط لموقف آمن جدًا (خطوة صغيرة).",
        "اليوم 6: تواصل مع شخص موثوق.",
        "اليوم 7: لو الكوابيس/الفلاشباك مستمرة: دعم مختص مهم."
      ],
      unclear: [
        "اليوم 1: سجّل نومك ومزاجك (0–10).",
        "اليوم 2: لاحظ أكتر عرض بيضايقك.",
        "اليوم 3: جرّب تمشية 10 دقائق.",
        "اليوم 4: قلّل كافيين/سوشيال قبل النوم.",
        "اليوم 5: كلم حد قريب.",
        "اليوم 6: اختبر شامل FULL داخل التطبيق.",
        "اليوم 7: راجع النتائج وحدد محور واحد للمتابعة."
      ]
    };
    const en = {
      depression: [
        "Day 1: Keep a consistent sleep/wake time.",
        "Day 2: 10–15 min light walk in daylight.",
        "Day 3: Balanced meal + enough water.",
        "Day 4: Do one small postponed task (10 min).",
        "Day 5: Message/call someone you trust.",
        "Day 6: Reduce social screens 1h before bed.",
        "Day 7: Reflect: write 3 small improvements."
      ],
      anxiety: [
        "Day 1: 4/6 breathing twice daily (3 min).",
        "Day 2: Reduce caffeine after 3 pm.",
        "Day 3: Write worries + best/likely outcomes.",
        "Day 4: 10-min mindful walk (senses).",
        "Day 5: Disable non‑essential notifications for 2h.",
        "Day 6: 5-min progressive muscle relaxation at night.",
        "Day 7: Identify triggers + one small mitigation step."
      ],
      ocd: [
        "Day 1: Log obsessions/compulsions & timing.",
        "Day 2: Delay compulsion by 1–2 minutes.",
        "Day 3: Reduce repetitions by one.",
        "Day 4: Light ERP: brief exposure without response.",
        "Day 5: Track progress, not perfection.",
        "Day 6: Prioritize sleep (fatigue worsens OCD).",
        "Day 7: If impairing, consider specialist support (ERP)."
      ],
      trauma: [
        "Day 1: Simple sleep routine; reduce triggers before bed.",
        "Day 2: Grounding 5‑4‑3‑2‑1 once daily.",
        "Day 3: Short note: 'I am safe now' + 2 reasons.",
        "Day 4: 10 min gentle movement to release tension.",
        "Day 5: One tiny safe step toward reducing avoidance.",
        "Day 6: Reach out to someone you trust.",
        "Day 7: If nightmares/flashbacks persist, seek support."
      ],
      unclear: [
        "Day 1: Track sleep & mood (0–10).",
        "Day 2: Identify your top bothersome symptom.",
        "Day 3: 10-min walk.",
        "Day 4: Reduce caffeine/screens before bed.",
        "Day 5: Talk to someone you trust.",
        "Day 6: Run the FULL assessment in the app.",
        "Day 7: Review results and pick one focus area."
      ]
    };
    const bank = (this.lang==='ar') ? ar : en;
    return bank[domain] || bank.unclear;
  }

  renderAskAIResult(result){
    const box = this.$('askResult');
    const body = this.$('askResultBody');
    const startDomainBtn = this.$('askStartDomainBtn');
    const t = this.langText;

    box.style.display = 'block';

    const danger = (String(result?.safety_level || '').toLowerCase() === 'high');

    // Strict safety
    if (danger){
      const advice = Array.isArray(result?.advice) ? result.advice : [];
      body.innerHTML = `
        <div style="padding:.9rem; border:1px solid var(--bad); border-radius:14px; background: rgba(248,113,113,.12); color: var(--text); line-height:1.7">
          <b>${t.askDangerTitle || 'تنبيه مهم'}</b>
          <div style="margin-top:.5rem">
            ${(advice.length ? advice.map(x=>`<div>• ${String(x)}</div>`).join('') : (t.askDangerBody || 'لو في خطر فوري: اتواصل حالا مع شخص قريب أو طوارئ/مستشفى.'))}
          </div>
        </div>
      `;
      startDomainBtn.style.display = 'none';
      return;
    }

    // Handle API errors / offline backend
    if (result?.error){
      body.innerHTML = `
        <div style="padding:.9rem; border:1px solid var(--warn); border-radius:14px; background: rgba(251,191,36,.10); color: var(--text); line-height:1.7">
          <b>${(this.lang === 'ar') ? 'ملاحظة' : 'Note'}</b>
          <div style="margin-top:.4rem">
            ${(this.lang === 'ar')
              ? 'معين حاول يستخدم الذكاء الاصطناعي لكن الخدمة مش متاحة دلوقتي. هنستخدم التحليل المحلي كبديل.'
              : 'AI service is not available right now. Falling back to local analysis.'}
          </div>
        </div>
      `;
      startDomainBtn.style.display = 'none';
      return;
    }

    const domain = (result?.domain && typeof result.domain === 'string') ? result.domain : 'unclear';
    const conf = Number.isFinite(+result?.confidence) ? Math.max(0, Math.min(100, +result.confidence)) : 0;
    const summary = String(result?.summary || '');

    const advice = Array.isArray(result?.advice) ? result.advice : [];
    const followups = Array.isArray(result?.followups) ? result.followups : [];
    const suggested_test = String(result?.suggested_test || '');

    const domainNice = (domain && domain !== 'unclear') ? this.domainLabel(domain) : ((this.lang === 'ar') ? 'غير واضح' : 'Unclear');

    const adviceHtml = advice.length
      ? `<ul class="advice-list" style="margin: .5rem 0 0 0;">${advice.slice(0,5).map(x=>`<li>${String(x)}</li>`).join('')}</ul>`
      : '';

    const followupsHtml = followups.length
      ? `<div style="margin-top:.75rem"><b>${(this.lang === 'ar') ? 'أسئلة متابعة' : 'Follow-up questions'}</b>
          <ul class="advice-list" style="margin: .5rem 0 0 0;">${followups.slice(0,3).map(x=>`<li>${String(x)}</li>`).join('')}</ul>
        </div>`
      : '';

    body.innerHTML = `
      <div style="color: var(--text); line-height:1.7">
        <div style="display:flex; gap:.5rem; flex-wrap:wrap; justify-content:space-between; align-items:center">
          <div><b>${(this.lang === 'ar') ? 'النتيجة (AI)' : 'Result (AI)'}</b></div>
          <div class="text-muted">${(this.lang === 'ar') ? 'مش تشخيص طبي' : 'Not a medical diagnosis'}</div>
        </div>
        ${summary ? `<div style="margin-top:.35rem"><b>${(this.lang === 'ar') ? 'ملخص:' : 'Summary:'}</b> ${summary}</div>` : ''}
        <div style="margin-top:.35rem"><b>${(this.lang === 'ar') ? 'المحور الأقرب:' : 'Closest domain:'}</b> ${domainNice} — <b>${conf}%</b></div>
        <div class="text-muted" style="margin-top:.2rem"><b>${(this.lang === 'ar') ? 'درجة الثقة:' : 'Confidence:'}</b> ${this.confidenceLabel(conf)} </div>
        ${adviceHtml}
        ${followupsHtml}
        <div style="display:flex; gap:.6rem; flex-wrap:wrap; justify-content:center; margin-top:.9rem">
          <button id="askWhyBtn" class="btn secondary">${(this.lang==='ar')?'ليه النتيجة دي؟':'Why this result?'}</button>
          <button id="askPlanBtn" class="btn secondary">${(this.lang==='ar')?'خطة 7 أيام':'7‑Day Plan'}</button>
          <button id="askDataBtn" class="btn secondary">${(this.lang==='ar')?'الخصوصية والبيانات':'Privacy & Data'}</button>
        </div>

        ${suggested_test ? `<div class="text-muted" style="margin-top:.75rem">${(this.lang === 'ar') ? 'الاختبار المقترح:' : 'Suggested test:'} <b>${suggested_test}</b></div>` : ''}
      </div>
    `;

    // Suggested start button behavior
    const targetDomain = this.mapSuggestedTestToDomain(suggested_test, (domain !== 'unclear' ? domain : null));
    if (targetDomain){
      startDomainBtn.style.display = 'inline-flex';
      const prefix = t.askStartPrefix || ((this.lang === 'ar') ? 'ابدأ اختبار' : 'Start');
      startDomainBtn.textContent = `${prefix} ${this.domainLabel(targetDomain)}`;
      startDomainBtn.onclick = () => this.startSuggestedDomain(targetDomain);
    } else {
      // FULL / unclear
      startDomainBtn.style.display = 'none';
    }

    // Extra helpers (Why / Plan / Privacy)
    try{
      const whyBtn = document.getElementById('askWhyBtn');
      if (whyBtn){
        whyBtn.onclick = () => {
          const factors = this.buildWhyFactors({ domain, summary, userText: this.$('askInput')?.value || '' });
          const padSide = (this.lang === 'ar') ? 'right' : 'left';
          const list = `<ul style="margin:.5rem 0 0 0; padding-${padSide}:1.1rem; line-height:1.8">` + factors.map(x=>`<li>${String(x)}</li>`).join('') + `</ul>`;
          this.openModal((this.lang==='ar')?'ليه النتيجة دي؟':'Why this result?', list);
        };
      }

      const planBtn = document.getElementById('askPlanBtn');
      if (planBtn){
        planBtn.onclick = () => {
          const d = (domain && domain !== 'unclear') ? domain : 'unclear';
          const items = this.generate7DayPlan(d);
          const padSide = (this.lang === 'ar') ? 'right' : 'left';
          const list = `<ol style="margin:.5rem 0 0 0; padding-${padSide}:1.2rem; line-height:1.9">` + items.map(x=>`<li>${String(x)}</li>`).join('') + `</ol>`;
          const note = `<div class="text-muted" style="margin-top:.75rem">${(this.lang==='ar')?'دي خطة عامة ومش بديل لمختص لو الأعراض شديدة أو مستمرة.':'This is a general plan and not a substitute for professional care if symptoms are severe or persistent.'}</div>`;
          this.openModal((this.lang==='ar')?'خطة 7 أيام':'7‑Day Plan', list + note);
        };
      }

      const dataBtn = document.getElementById('askDataBtn');
      if (dataBtn){
        dataBtn.onclick = () => {
          const body = (this.lang==='ar')
            ? `
              <div style="line-height:1.9">
                <b>مبدأ تقليل البيانات:</b> التطبيق محتاج أقل قدر ممكن من المعلومات عشان يشتغل.
                <br><br>
                <b>محليًا:</b> التقييمات/المزاج ممكن تتخزن على جهازك فقط (LocalStorage) لو فعلت الحفظ.
                <br>
                <b>لو استخدمت AI:</b> النص بيتبعت للسيرفر عندكم عشان التحليل، ومينفعش نحط مفتاح API داخل الـHTML.
                <br><br>
                <b>نصيحة:</b> ما تكتبش بيانات حساسة (اسم كامل/عنوان/أرقام…).
              </div>`
            : `
              <div style="line-height:1.9">
                <b>Data minimization:</b> the app uses as little info as possible.
                <br><br>
                <b>Locally:</b> assessments/mood can be stored on your device only (LocalStorage) if enabled.
                <br>
                <b>If AI is used:</b> text is sent to your server for analysis; API keys must stay on the server.
                <br><br>
                <b>Tip:</b> avoid entering sensitive personal data.
              </div>`;
          this.openModal((this.lang==='ar')?'الخصوصية والبيانات':'Privacy & Data', body);
        };
      }
    } catch(e){}


  }

  startSuggestedDomain(domainKey){
    this.mode = 'single';
    this.targetDomain = domainKey;

    // UI reflect mode selection
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    const singleBtn = document.querySelector('[data-mode="single"]');
    if (singleBtn) singleBtn.classList.add('active');

    const ds = this.$('domainSelect');
    if (ds) ds.style.display = 'block';

    const di = this.$('domainInput');
    if (di) di.value = domainKey;

    this.showSection('setup');
  }




  // --- Multi-user support ---
  loadUsers() {
    let users = safeJsonParse(storage.getItem(STORAGE.users), null);
    if (!Array.isArray(users) || users.length === 0) {
      const first = { id: uid(), name: (this.lang === 'ar' ? 'إسلام' : 'User 1'), createdAt: new Date().toISOString() };
      users = [first];
      storage.setItem(STORAGE.users, JSON.stringify(users));
      storage.setItem(STORAGE.currentUser, first.id);
    }
    const current = storage.getItem(STORAGE.currentUser) || users[0].id;
    if (!users.some(u => u.id === current)) storage.setItem(STORAGE.currentUser, users[0].id);
    this.users = users;
    this.currentUserId = storage.getItem(STORAGE.currentUser);
  }

  getCurrentUser() {
    return (this.users || []).find(u => u.id === this.currentUserId) || (this.users?.[0] || null);
  }

  setCurrentUser(id) {
    if (!this.users.some(u => u.id === id)) return;
    this.currentUserId = id;
    storage.setItem(STORAGE.currentUser, id);
    const u = this.getCurrentUser();
    if (u) this.$('nameInput').value = u.name;
  }

  getHistoryKey() {
    return `ps_history_${this.currentUserId || 'default'}`;
  }

  loadHistory() {
    return safeJsonParse(storage.getItem(this.getHistoryKey()) || '[]', []);
  }

  saveHistoryItem(report) {
    const hist = this.loadHistory();
    hist.push(report);
    storage.setItem(this.getHistoryKey(), JSON.stringify(hist));
  }

  // --- Admin / model persistence ---
  openAdmin() {
    const model = loadModel();
    this.$('configEditor').value = JSON.stringify(model, null, 2);
    this.$('adminBackdrop').classList.remove('hidden');
  }

  closeAdmin() {
    this.$('adminBackdrop').classList.add('hidden');
  }

  openUsers() {
    this.populateUserSelect();
    const u = this.getCurrentUser();
    this.$('renameUserName').value = u?.name || '';
    this.$('userBackdrop').classList.remove('hidden');
  }

  closeUsers() {
    this.$('userBackdrop').classList.add('hidden');
  }

  populateUserSelect() {
    const sel = this.$('userSelect');
    sel.innerHTML = '';
    (this.users || []).forEach(u => {
      const opt = document.createElement('option');
      opt.value = u.id;
      opt.textContent = u.name;
      if (u.id === this.currentUserId) opt.selected = true;
      sel.appendChild(opt);
    });
  }

  init() {
    // Load users
    this.loadUsers();

    // Apply Theme
    document.documentElement.setAttribute('data-theme', this.theme);
    this.$('themeToggle').textContent = this.theme === 'dark' ? '☀' : '☾';
    
    // Event Listeners
    this.$('themeToggle').onclick = () => this.toggleTheme();
    this.$('langToggle').onclick = () => this.toggleLang(); 
    this.$('userToggle').onclick = () => this.openUsers();
    this.$('adminToggle').onclick = () => this.openAdmin();
    this.$('welcomeBtn').onclick = () => this.showSection('setup');

    // Ask Mo'een
    if (this.$('askOpenBtn')) this.$('askOpenBtn').onclick = () => this.showSection('ask');
    if (this.$('askBackBtn')) this.$('askBackBtn').onclick = () => this.showSection('welcome');
    if (this.$('askClearBtn')) this.$('askClearBtn').onclick = () => { this.$('askInput').value = ''; this.$('askResult').style.display = 'none'; };
    if (this.$('askSendBtn')) this.$('askSendBtn').onclick = async () => {
      const btn = this.$('askSendBtn');
      const txt = this.$('askInput').value || '';
      if (btn){ btn.disabled = true; btn.style.opacity = '0.85'; btn.textContent = (this.lang === 'ar') ? 'جاري التحليل...' : 'Analyzing...'; }
      try {
        // Try AI backend first (recommended for high accuracy)
        const ai = await this.callTriageAPI(txt);
        this.renderAskAIResult(ai);
      } catch (e) {
        // Fallback to local analysis (offline)
        const analysis = this.analyzeFreeText(txt);
        this.renderAskResult(analysis);
      } finally {
        if (btn){ btn.disabled = false; btn.style.opacity = ''; btn.textContent = this.langText.askSendBtn || ((this.lang === 'ar') ? 'حلل الكلام' : 'Analyze'); }
      }
    };
    if (this.$('askStartFullBtn')) this.$('askStartFullBtn').onclick = () => { 
      this.mode = 'all';
      document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
      const allBtn = document.querySelector('[data-mode="all"]');
      if (allBtn) allBtn.classList.add('active');
      if (this.$('domainSelect')) this.$('domainSelect').style.display = 'none';
      this.showSection('setup');
    };
    
    // Developer Info Button Listener (Now switches to the page)
    this.$('devsToggle').onclick = () => this.showSection('developers_page'); 
    
    this.$('navHistory').onclick = () => this.renderHistory();
    if (this.$('navAppointments')) this.$('navAppointments').onclick = () => this.openAppointments();
    if (this.$('apptBackBtn')) this.$('apptBackBtn').onclick = () => this.showSection('welcome'); 
    
    // Quick check + Mood + Ethics
    if (this.$('quickOpenBtn')) this.$('quickOpenBtn').onclick = () => this.showSection('quick');
    if (this.$('moodOpenBtn')) this.$('moodOpenBtn').onclick = () => { this.showSection('mood'); this.renderMood(); };
    if (this.$('ethicsOpenBtn')) this.$('ethicsOpenBtn').onclick = () => this.showSection('ethics');
    if (this.$('quickBackBtn')) this.$('quickBackBtn').onclick = () => this.showSection('welcome');
    if (this.$('moodBackBtn')) this.$('moodBackBtn').onclick = () => this.showSection('welcome');
    if (this.$('ethicsBackBtn')) this.$('ethicsBackBtn').onclick = () => this.showSection('welcome');

    if (this.$('moodValue')) this.$('moodValue').addEventListener('input', (e) => {
      const v = e.target.value;
      if (this.$('moodValueShow')) this.$('moodValueShow').textContent = v;
    });

    if (this.$('moodSaveBtn')) this.$('moodSaveBtn').onclick = () => this.saveMood();

    if (this.$('quickRunBtn')) this.$('quickRunBtn').onclick = () => this.runQuickCheck();

    // Voice input (Ask)
    if (this.$('askMicBtn')) this.$('askMicBtn').onclick = () => this.startVoiceInput();
    if (this.$('askSampleBtn')) this.$('askSampleBtn').onclick = () => {
      const sample = (this.lang === 'ar') ? 'بقالي أسبوعين متوتر ومش بنام كويس وبفكر كتير في أسوأ الاحتمالات.' : 'For two weeks I have been anxious, sleeping poorly, and overthinking worst-case scenarios.';
      this.$('askInput').value = sample;
    };

this.$('startTestBtn').onclick = () => this.startTest();
    
    this.$('prevBtn').onclick = () => this.prevQ();
    this.$('nextBtn').onclick = () => this.nextQ();
    this.$('skipBtn').onclick = () => this.skipQ();
    this.$('reviewBtn').onclick = () => this.openReview();

    // Review section buttons
    this.$('reviewBackBtn').onclick = () => { this.showSection('test'); this.renderQuestion(); };
    this.$('reviewFinishBtn').onclick = () => this.finishFromReview();
// Floating Action Bar listeners
    this.$('newDiagnosisBtn').onclick = () => this.reset();
    this.$('downloadPDFBtn').onclick = () => this.createPDFReport(); 

    // Setup Logic
    document.querySelectorAll('.mode-btn').forEach(b => {
      b.onclick = (e) => {
        document.querySelectorAll('.mode-btn').forEach(x => x.classList.remove('active'));
        e.target.classList.add('active');
        this.mode = e.target.dataset.mode;
        this.$('domainSelect').style.display = this.mode === 'single' ? 'block' : 'none';
      }
    });

    // Check for TTS support and hide button if not available
    if (!('speechSynthesis' in window) && this.$('ttsButton')) {
        this.$('ttsButton').style.display = 'none';
    }

    // User modal actions
    this.$('userClose').onclick = () => this.closeUsers();
    this.$('userSelectBtn').onclick = () => { this.setCurrentUser(this.$('userSelect').value); this.closeUsers(); };
    this.$('addUserBtn').onclick = () => {
      const name = (this.$('newUserName').value || '').trim();
      if (!name) return alert(this.lang === 'ar' ? 'اكتب اسم المستخدم' : 'Enter a user name');
      const nu = { id: uid(), name, createdAt: new Date().toISOString() };
      this.users.push(nu);
      storage.setItem(STORAGE.users, JSON.stringify(this.users));
      this.setCurrentUser(nu.id);
      this.$('newUserName').value = '';
      this.populateUserSelect();
    };
    this.$('renameUserBtn').onclick = () => {
      const name = (this.$('renameUserName').value || '').trim();
      if (!name) return alert(this.lang === 'ar' ? 'اكتب الاسم الجديد' : 'Enter a new name');
      const u = this.getCurrentUser();
      if (!u) return;
      u.name = name;
      storage.setItem(STORAGE.users, JSON.stringify(this.users));
      this.$('nameInput').value = name;
      this.populateUserSelect();
    };
    this.$('deleteUserBtn').onclick = () => {
      if (this.users.length <= 1) return alert(this.lang === 'ar' ? 'لازم يفضل مستخدم واحد على الأقل' : 'At least one user must remain');
      const u = this.getCurrentUser();
      if (!u) return;
      const ok = confirm(this.lang === 'ar' ? 'متأكد؟ هيتحذف المستخدم وسجله من الجهاز' : 'Are you sure? This will delete the user and their local history.');
      if (!ok) return;
      storage.removeItem(this.getHistoryKey());
      this.users = this.users.filter(x => x.id !== u.id);
      storage.setItem(STORAGE.users, JSON.stringify(this.users));
      this.setCurrentUser(this.users[0].id);
      this.populateUserSelect();
      this.$('renameUserName').value = this.getCurrentUser()?.name || '';
    };

    // Admin modal actions
    this.$('adminClose').onclick = () => this.closeAdmin();
    this.$('exportConfigBtn').onclick = () => {
      const model = loadModel();
      downloadText('moeen_config.json', JSON.stringify(model, null, 2));
    };
    this.$('importConfigBtn').onclick = async () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'application/json';
      input.onchange = async () => {
        const file = input.files?.[0];
        if (!file) return;
        const txt = await file.text();
        try {
          const obj = JSON.parse(txt);
          validateModel(obj);
          storage.setItem(STORAGE.config, JSON.stringify(obj));
          this.model = obj;
          this.$('configEditor').value = JSON.stringify(obj, null, 2);
          alert(this.lang === 'ar' ? 'تم الاستيراد. هيتطبق فورا.' : 'Imported. Applied immediately.');
          this.updateUI();
        } catch(e) {
          alert((this.lang === 'ar' ? 'ملف JSON غير صالح: ' : 'Invalid JSON: ') + e.message);
        }
      };
      input.click();
    };
    this.$('resetConfigBtn').onclick = () => {
      const ok = confirm(this.lang === 'ar' ? 'ترجع الافتراضي؟' : 'Restore defaults?');
      if (!ok) return;
      storage.removeItem(STORAGE.config);
      this.model = deepClone(DEFAULT_MODEL);
      this.$('configEditor').value = JSON.stringify(this.model, null, 2);
      this.updateUI();
    };
    this.$('saveConfigBtn').onclick = () => {
      try {
        const obj = JSON.parse(this.$('configEditor').value);
        validateModel(obj);
        storage.setItem(STORAGE.config, JSON.stringify(obj));
        this.model = obj;
        alert(this.lang === 'ar' ? 'اتحفظ واتطبق.' : 'Saved and applied.');
        this.updateUI();
        this.closeAdmin();
      } catch(e) {
        alert((this.lang === 'ar' ? 'فيه خطأ في JSON: ' : 'JSON error: ') + e.message);
      }
    };

    // Set default name to current user
    const cu = this.getCurrentUser();
    if (cu) this.$('nameInput').value = cu.name;

    this.applyLang();
    this.updateUI(); 
    this.maybeShowDisclaimer();
  }

  // --- LANGUAGE HANDLING ---
  
  // ====== NEW FEATURES (Mood / Quick Check / Voice) ======
  getMoodHistory(){
    try { return JSON.parse(storage.getItem('moeen_mood_history') || '[]'); } catch(e){ return []; }
  }
  setMoodHistory(arr){
    storage.setItem('moeen_mood_history', JSON.stringify(arr || []));
  }
  saveMood(){
    const v = Number(this.$('moodValue')?.value ?? 5);
    const note = String(this.$('moodNote')?.value || '').trim();
    const day = new Date();
    const key = day.toISOString().slice(0,10); // YYYY-MM-DD

    const hist = this.getMoodHistory();
    const existingIdx = hist.findIndex(x => x.date === key);
    const entry = { date: key, value: v, note };
    if (existingIdx >= 0) hist[existingIdx] = entry; else hist.push(entry);
    hist.sort((a,b)=>a.date.localeCompare(b.date));
    this.setMoodHistory(hist);

    // Small hint
    if (this.$('moodHints')){
      const last = entry.value;
      const hintAr = last <= 3
        ? 'لو اليوم صعب: خد نفس عميق، كل كويس، وحاول تكلم حد قريب. وافتكر: ربنا لطيف.'
        : (last <= 6 ? 'كويس إنك بتسجل يومك. استمر على خطوات صغيرة.' : 'جميل! حاول تثبت العادات اللي بتساعدك.');
      const hintEn = last <= 3 ? 'If today is hard: breathe, eat, reach out to someone you trust.' :
        (last <= 6 ? 'Good job tracking your day—keep small steps.' : 'Great—try to keep the habits that helped.');
      this.$('moodHints').textContent = (this.lang === 'ar') ? hintAr : hintEn;
    }
    this.renderMood();
  }

  renderMood(){
    const hist = this.getMoodHistory();
    const labels = hist.slice(-14).map(x=>x.date.slice(5)); // last 14 days MM-DD
    const values = hist.slice(-14).map(x=>x.value);

    if (this.$('moodValueShow') && this.$('moodValue')) this.$('moodValueShow').textContent = this.$('moodValue').value;

    // Chart (reuse Chart.js if present)
    try {
      const ctx = this.$('moodChart')?.getContext('2d');
      if (!ctx) return;
      if (this.moodChart) { this.moodChart.destroy(); this.moodChart = null; }
      this.moodChart = new Chart(ctx, {
        type: 'line',
        data: { labels, datasets: [{ label: (this.lang==='ar')?'المزاج':'Mood', data: values, tension: 0.25 }] },
        options: { responsive:true, plugins:{ legend:{ display:false } }, scales:{ y:{ min:0, max:10 } } }
      });
    } catch(e) {}
  }

  runQuickCheck(){
    const v = (id)=> this.$(id)?.value;
    const a = { q1:v('q1'), q2:v('q2'), q3:v('q3'), q4:v('q4'), q5:v('q5') };
    // Simple scoring
    const score = { anxiety:0, depression:0, ocd:0, trauma:0 };
    if (a.q1==='y') score.anxiety += 2;
    if (a.q2==='y') score.depression += 2;
    if (a.q3==='y') score.ocd += 2;
    if (a.q4==='y') score.trauma += 2;
    if (a.q5==='y') { score.anxiety++; score.depression++; score.ocd++; score.trauma++; }

    const entries = Object.entries(score).sort((x,y)=>y[1]-x[1]);
    const top = entries[0];
    const second = entries[1];
    const confidence = top[1]===0 ? 0 : Math.min(100, 50 + (top[1]-second[1])*20 + top[1]*10);
    const domain = top[1]===0 ? 'unclear' : top[0];
    const suggested_test = (domain==='depression')?'PHQ-9':(domain==='anxiety')?'GAD-7':(domain==='ocd')?'OCD':(domain==='trauma')?'PTSD':'FULL';

    const box = this.$('quickResult');
    if (box){
      box.style.display='block';
      const name = this.model?.config?.domains?.[domain]?.[this.lang] || domain;
      const msgAr = domain==='unclear'
        ? 'مش واضح محور واحد من إجاباتك. الأفضل تعمل اختبار شامل.'
        : `أقرب محور: <b>${name}</b> — ثقة تقريبية: <b>${Math.round(confidence)}%</b>`;
      const msgEn = domain==='unclear'
        ? 'No single domain is clear. Consider the full assessment.'
        : `Closest domain: <b>${name}</b> — Approx. confidence: <b>${Math.round(confidence)}%</b>`;
      box.innerHTML = `
        <h3 style="margin-top:0;">النتيجة</h3>
        <p>${(this.lang==='ar')?msgAr:msgEn}</p>
        <div style="display:flex; gap:.75rem; flex-wrap:wrap; justify-content:center; margin-top:.75rem;">
          <button id="quickStartBtn" class="btn primary">${(this.lang==='ar')?('ابدأ '+suggested_test):('Start '+suggested_test)}</button>
        </div>
      `;
      const b = this.$('quickStartBtn');
      if (b) b.onclick = () => {
        if (domain==='unclear'){
          this.mode='all';
          this.showSection('setup');
          return;
        }
        this.mode='single';
        this.targetDomain=domain;
        // sync setup UI if present
        const di=this.$('domainInput'); if (di) di.value=domain;
        const ds=this.$('domainSelect'); if (ds) ds.style.display='block';
        document.querySelectorAll('.mode-btn').forEach(x=>x.classList.remove('active'));
        const singleBtn=document.querySelector('[data-mode="single"]'); if(singleBtn) singleBtn.classList.add('active');
        this.showSection('setup');
      };
    }
  }

  startVoiceInput(){
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const btn = this.$('askMicBtn');
    if (!SpeechRecognition){
      if (btn) btn.textContent = (this.lang==='ar') ? '🎙️ غير مدعوم' : '🎙️ Not supported';
      return;
    }
    const rec = new SpeechRecognition();
    rec.lang = (this.lang === 'ar') ? 'ar-EG' : 'en-US';
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    if (btn){ btn.disabled = true; btn.textContent = (this.lang==='ar') ? '🎙️ اسمعك...' : '🎙️ Listening...'; }

    rec.onresult = (e) => {
      const t = e.results?.[0]?.[0]?.transcript || '';
      const cur = this.$('askInput')?.value || '';
      this.$('askInput').value = (cur ? (cur + ' ') : '') + t;
    };
    rec.onerror = () => {};
    rec.onend = () => { if (btn){ btn.disabled=false; btn.textContent = (this.lang==='ar') ? '🎙️ تسجيل صوت' : '🎙️ Voice'; } };

    try { rec.start(); } catch(e){ if (btn){ btn.disabled=false; btn.textContent = (this.lang==='ar') ? '🎙️ تسجيل صوت' : '🎙️ Voice'; } }
  }

toggleLang() {
    this.lang = this.lang === 'ar' ? 'en' : 'ar';
    storage.setItem(STORAGE.lang, this.lang);
    this.applyLang();
    this.updateUI(); 
    
    // Re-render based on current section
    if(document.querySelector('#test.active')) this.renderQuestion();
    else if (document.querySelector('#result.active') && this.currentReport) this.renderResult(this.currentReport); 
    else if (document.querySelector('#history.active')) this.renderHistory(); 
  }

  applyLang() {
    this.updateHtmlDirection();
    this.$('langToggle').textContent = this.lang === 'ar' ? 'EN' : 'عربي';
  }
  
  updateHtmlDirection() {
    // Ensures the correct font is applied via CSS as well
    document.documentElement.lang = this.lang;
    document.documentElement.dir = this.lang === 'ar' ? 'rtl' : 'ltr';
  }

  get langText() {
    return this.txt[this.lang];
  }

  updateUI() {
    // NEW APP IDENTITY TEXT
    this.txt = {
      ar: {
        brandName: "معين", 
        brandSub: "معينك الرقمي على طريق التعافي", 
        welcomeTitle: "أهلا بك في معين", 
        welcomeSub: "نظام معين. واجهة متطورة، تحليل بيانات أعمق، وتقارير دقيقة.", 
        welcomeBtn: "بدء تقييم جديد", feature1Title: "🔬 تحليل دقيق", feature1Sub: "تقييم كمي قائم على الأعراض لأربعة محاور رئيسية.",
        feature2Title: "📊 تصنيف الشدة", feature2Sub: "تحديد مستويات الشدة الإكلينيكية (خفيف، متوسط، شديد).",
        setupTitle: "إعدادات الجلسة", setupSub: "الرجاء إدخال بيانات التعريف لضمان دقة التقرير.",
        namePlaceholder: "الاسم / الكود التعريفي", agePlaceholder: "العمر",
        genderDefault: "اختر النوع", genderMale: "ذكر", genderFemale: "أنثى",
        modeLabel: "وضع التقييم:", modeAll: "شامل (40 سؤالا)", modeSingle: "تركيز (محور واحد)",
        domainDefault: "-- اختر المحور --", setupBackBtn: "رجوع", startTestBtn: "بدء التقييم",
        prevBtn: "السابق",
        nextBtn: "التالي", skipBtn: "تخطي", reviewBtn: "مراجعة",
        reviewTitle: "مراجعة الإجابات", reviewSub: "راجع إجاباتك قبل إنشاء التقرير.",
        reviewBackBtn: "رجوع للأسئلة", reviewFinishBtn: "إنشاء التقرير", resultTitle: "تقرير التحليل الإكلينيكي", trendLabel: "📊 تحليل المسار:",
        heatmapTitle: "مصفوفة المخاطر والشدة (Risk & Severity Matrix)",
        // Supportive Content Text
        supportTitle: "⚠️ تنبيه: إشارات إجهاد نفسي عالية",
        supportIntro: "البيانات تشير إلى ارتفاع في مؤشر الإجهاد. نوصي بالتواصل للحصول على دعم واستخدام الإرشادات التالية:",
        helpLinesTitle: "📞 أرقام مساعدة فورية", adviceTitle: "💡 نصائح تساعدك الآن", quranTitle: "📜 آيات تبعث الطمأنينة",
        line1: "الخط الساخن للدعم النفسي: **123456**", line2: "خط الإرشاد الأسري: **987654**",
        quranV1: "يا أيها الذين آمنوا استعينوا بالصبر والصلاة ۚ إن الله مع الصابرين (البقرة: 153)",
        quranV2: "ألا بذكر الله تطمئن القلوب (الرعد: 28)",
        printBtn: "📄 طباعة التقرير (PDF)", exportBtn: "📥 تحميل السجل (JSON)", newDiagnosisBtn: "تقييم جديد",
        historyTitle: "سجل التقييمات", historySub: "عرض وتتبع التقارير السابقة.", historyBackBtn: "عودة",
        printHistBtn: "طباعة", exportSingleBtn: "تصدير JSON",
        levelStable: "مستقر", levelMild: "خفيف", levelModerate: "متوسط", levelSevere: "شديد",
        trendUp: (diff) => `⚠️ ارتفاع بنسبة ${diff}% عن آخر فحص.`,
        trendDown: (diff) => `✅ تحسن (انخفاض) بنسبة ${Math.abs(diff)}%.`,
        trendStable: "↔️ مستوى مستقر مقارنة بالسجل السابق.",
        trendDetailsTitle: "📈 مقارنة بالمرة السابقة (حسب المحور)",
        trendDetailsNone: "لا توجد مقارنة متاحة لعدم وجود سجل سابق لهذا المستخدم.",
        trendDomainUp: (name, diff) => `⬆️ ${name}: زيادة ${diff}%`,
        trendDomainDown: (name, diff) => `⬇️ ${name}: تحسن ${Math.abs(diff)}%`,
        trendDomainStable: (name) => `↔️ ${name}: ثابت تقريبا`,
        disclaimerTitle: "تنبيه مهم",
        disclaimerText: "هذا التقرير أداة مساعدة ودعم قرار (Screening) ولا يعد تشخيصا طبيا. إذا كانت الأعراض شديدة أو مستمرة، ينصح بالتواصل مع مختص.",
        recoTitle: "✅ توصيات مخصصة",
        recoSummary: "مبنية على أعلى المحاور تأثيرا في نتيجتك الحالية.",
        recoNone: "لا توجد توصيات تفصيلية لأن النتيجة منخفضة. حافظ على روتين صحي وراقب حالتك.",
        // NEW TEXTS
        ttsButtonTitle: "قراءة السؤال", 
        historyChartTitle: "منحنى التطور الزمني (النتيجة الإجمالية %)",
        exportCsvBtn: "📥 تصدير كملف CSV",
        clearAllBtn: "🗑️ مسح كل البيانات", 
        userTitle: "المستخدم",
        userHint: "اختار مستخدم أو اعمل واحد جديد. كل مستخدم ليه سجل منفصل.",
        userSelectBtn: "اختيار",
        addUserBtn: "إضافة",
        renameUserBtn: "تعديل",
        deleteUserBtn: "حذف",
        userClose: "إغلاق",
        adminTitle: "لوحة الإدارة (تعديل الأسئلة)",
        adminHint: "عدل JSON ثم احفظ. لو حصل خطأ، اضغط استرجاع الافتراضي.",
        exportConfigBtn: "تصدير JSON",
        importConfigBtn: "استيراد JSON",
        resetConfigBtn: "استرجاع الافتراضي",
        saveConfigBtn: "حفظ",
        adminClose: "إغلاق",
        askOpenBtn: "اسأل معين",
        askTitle: "اسأل معين",
        askSub: "اكتب اللي حاسه أو المشكلة… ومعين هيطلعلك تحليل مبدئي + أنسب اختبار.",
        askLabel: "وصف حالتك",
        askPlaceholder: "مثال: بقالي أسبوعين مش بنام كويس وقلقان طول الوقت...",
        askSendBtn: "حلل الكلام",
        quickOpenBtn: "فحص سريع",
        moodOpenBtn: "مزاجي اليوم",
        ethicsOpenBtn: "الأمان والأخلاقيات",
        quickTitle: "فحص سريع", quickSub: "جاوب 5 أسئلة سريعة (نعم/لا) عشان نحدد أنسب اختبار.",
        moodTitle: "مزاجي اليوم", moodSub: "سجل مزاجك اليومي (0–10) عشان نشوف الاتجاه مع الوقت.",
        ethicsTitle: "الأمان والأخلاقيات", ethicsSub: "صفحة مختصرة توضح حدود النظام وكيف بيحمي المستخدم.",

        askClearBtn: "مسح",
        askBackBtn: "رجوع",
        askResultTitle: "النتيجة المبدئية",
        askStartPrefix: "ابدأ اختبار",
        askStartFullBtn: "ابدأ اختبار شامل",
        askTopPrefix: "أقرب محور ظاهر من كلامك:",
        askDisclaimer: "ده تحليل مبدئي (مش تشخيص طبي). الأفضل تعمل الاختبار عشان النتيجة تبقى أدق.",
        askNoClear: "مش قادر أحدد محور واضح من الكلام ده.",
        askHintMore: "جرب تكتب تفاصيل أكتر: (المدة + الشدة + تأثيرها على النوم/الشغل).",
        askDangerTitle: "تنبيه مهم",
        askDangerBody: "الكلام فيه مؤشرات خطر/إيذاء نفس. معين مش بديل للطوارئ. لو في خطر فوري: اتواصل فورا مع شخص قريب أو طوارئ/مستشفى.",
        askFollowTitle: "أسئلة متابعة سريعة",
        askFollowHint: "اختار (نعم/لا) عشان نثبت التشخيص الأنسب قبل ما نبدأ الاختبار.",
        askComputeBtn: "ثبت النتيجة",
        askAfterFollow: "بعد أسئلة المتابعة، الأنسب هو:",
        yes: "نعم",
        no: "لا"

      },
      en: {
        brandName: "Mo'een", 
        brandSub: "Your Digital Supporter on the Path to Recovery", 
        welcomeTitle: "Welcome to Mo'een", 
        welcomeSub: "Mo'een System. Advanced interface, deeper data analysis, and precise clinical reports.", 
        welcomeBtn: "Start New Assessment", feature1Title: "🔬 Precise Analysis", feature1Sub: "Quantitative, symptom-based assessment for four core domains.",
        feature2Title: "📊 Severity Classification", feature2Sub: "Identifying clinical severity levels (Mild, Moderate, Severe).",
        setupTitle: "Session Settings", setupSub: "Please enter identification data to ensure report accuracy.",
        namePlaceholder: "Name / ID Code", agePlaceholder: "Age",
        genderDefault: "Select Gender", genderMale: "Male", genderFemale: "Female",
        modeLabel: "Assessment Mode:", modeAll: "Comprehensive (40 Questions)", modeSingle: "Focused (Single Domain)",
        domainDefault: "-- Select Domain --", setupBackBtn: "Back", startTestBtn: "Start Measurement",
        prevBtn: "Previous",
        nextBtn: "Next", skipBtn: "Skip", reviewBtn: "Review",
        reviewTitle: "Review Answers", reviewSub: "Review your answers before generating the report.",
        reviewBackBtn: "Back to Questions", reviewFinishBtn: "Generate Report", resultTitle: "Clinical Analysis Report", trendLabel: "📊 Trend Analysis:",
        heatmapTitle: "Risk & Severity Matrix",
        // Supportive Content Text
        supportTitle: "⚠️ Warning: High Psychological Stress Signals",
        supportIntro: "Data indicates a high stress index. We recommend reaching out for support and utilizing the following guidelines:",
        helpLinesTitle: "📞 Immediate Helplines", adviceTitle: "💡 Tips to Help You Now", quranTitle: "📜 Verses of Tranquility",
        line1: "Psychological Support Hotline: **123456**", line2: "Family Guidance Line: **987654**",
        quranV1: "O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient. (Al-Baqarah: 153)",
        quranV2: "Unquestionably, by the remembrance of Allah hearts are assured. (Ar-Ra'd: 28)",
        printBtn: "📄 Print Report (PDF)", exportBtn: "📥 Download History (JSON)", newDiagnosisBtn: "New Assessment",
        historyTitle: "Assessment History", historySub: "View and track past reports.", historyBackBtn: "Back",
        printHistBtn: "Print", exportSingleBtn: "Export JSON",
        levelStable: "Stable", levelMild: "Mild", levelModerate: "Moderate", levelSevere: "Severe",
        trendUp: (diff) => `⚠️ Increased by ${diff}% since last check.`,
        trendDown: (diff) => `✅ Improved (Dropped) by ${Math.abs(diff)}%.`,
        trendStable: "↔️ Stable level compared to history.",
        // NEW TEXTS
        ttsButtonTitle: "Read Question", 
        historyChartTitle: "Longitudinal Trend Chart (Overall Score %)",
        exportCsvBtn: "📥 Export to CSV", 
        userTitle: "User",
        userHint: "Choose a user or create a new one. Each user has separate local history stored on this device.",
        userSelectBtn: "Select",
        addUserBtn: "Add",
        renameUserBtn: "Rename",
        deleteUserBtn: "Delete",
        userClose: "Close",
        adminTitle: "Admin Panel (Edit Questions)",
        adminHint: "Edit JSON then save. If something breaks, restore defaults.",
        exportConfigBtn: "Export JSON",
        importConfigBtn: "Import JSON",
        resetConfigBtn: "Restore Defaults",
        saveConfigBtn: "Save",
        adminClose: "Close",
        askOpenBtn: "Ask Mo’een",
        askTitle: "Ask Mo’een",
        askSub: "Describe what you feel… Mo’een will give an initial triage and suggest the best test.",
        askLabel: "Describe your situation",
        askPlaceholder: "Example: I've been anxious and not sleeping well for two weeks...",
        askSendBtn: "Analyze",
        quickOpenBtn: "Quick Check",
        moodOpenBtn: "My Mood Today",
        ethicsOpenBtn: "Safety & Ethics",
        quickTitle: "Quick Check", quickSub: "Answer 5 quick yes/no questions to pick the best test.",
        moodTitle: "My Mood Today", moodSub: "Log your daily mood (0–10) to see trends over time.",
        ethicsTitle: "Safety & Ethics", ethicsSub: "Short page explaining limits and protections.",

        askClearBtn: "Clear",
        askBackBtn: "Back",
        askResultTitle: "Initial result",
        askStartPrefix: "Start",
        askStartFullBtn: "Start full assessment",
        askTopPrefix: "Most likely domain from your text:",
        askDisclaimer: "This is an initial keyword-based triage (not a medical diagnosis). Taking the test is more accurate.",
        askNoClear: "I couldn't identify a clear domain from this text.",
        askHintMore: "Try adding more detail (duration + intensity + impact on sleep/work).",
        askDangerTitle: "Important notice",
        askDangerBody: "Your text contains self-harm risk indicators. Mo’een is not an emergency service. If you’re in immediate danger, contact local emergency services or a trusted person right now.",
        askFollowTitle: "Quick follow-up questions",
        askFollowHint: "Pick (Yes/No) to confirm the best-fit test before starting.",
        askComputeBtn: "Confirm result",
        askAfterFollow: "After follow-up, the best fit is:",
        yes: "Yes",
        no: "No"

      }
    };
    
    const t = this.langText;

    // Update Brand Name in Header
    if(this.$('brandName')) this.$('brandName').textContent = t.brandName; 

    // Bulk update static texts
    for (const key in t) {
      const el = this.$[key] || this.$(key);
      if (el && el.tagName !== 'INPUT' && el.tagName !== 'SELECT' && el.tagName !== 'TEXTAREA' && key !== 'brandName') {
          el.textContent = t[key];
      }
    }
    
    // Handle Input Placeholders
    if(this.$('nameInput')) this.$('nameInput').placeholder = t.namePlaceholder;
    if(this.$('ageInput')) this.$('ageInput').placeholder = t.agePlaceholder;
    if(this.$('askInput')) this.$('askInput').placeholder = t.askPlaceholder;
    
    // Update Domain Select dropdown (dynamically)
    const sel = this.$('domainInput');
    if(sel) {
        sel.innerHTML = `<option value="">${t.domainDefault}</option>`;
        Object.keys(this.model.config.domains).forEach(k => {
          let opt = document.createElement('option');
          opt.value = k;
          opt.textContent = this.model.config.domains[k][this.lang];
          sel.appendChild(opt);
        });
    }

    // Update Supportive Content Lists
    if(this.$('helpLinesList')) {
        this.$('helpLinesList').innerHTML = `<li>${t.line1}</li><li>${t.line2}</li>`;
        this.$('quranVerse1').innerHTML = t.quranV1;
        this.$('quranVerse2').innerHTML = t.quranV2;
    }
    
    // Update Action Bar buttons
    this.$('downloadPDFBtn').textContent = t.printBtn;
    this.$('newDiagnosisBtn').textContent = t.newDiagnosisBtn;

    // Update Brand Sub-Text (Since it's now in the welcome section)
    if(this.$('brandSub')) this.$('brandSub').textContent = t.brandSub;

    // NEW: Update History Chart Title and CSV Button
    if(this.$('historyChartTitle')) this.$('historyChartTitle').textContent = t.historyChartTitle;
    if(this.$('exportCsvBtn')) this.$('exportCsvBtn').textContent = t.exportCsvBtn;
    if(this.$('clearAllBtn')) this.$('clearAllBtn').textContent = t.clearAllBtn;
    if(this.$('ttsButton')) this.$('ttsButton').title = t.ttsButtonTitle;
  }
  // --- END LANGUAGE HANDLING ---


  // --- DISCLAIMER (FIRST RUN) ---
  maybeShowDisclaimer() {
    const key = STORAGE.disclaimerOk;
    const accepted = storage.getItem(key) === '1';
    if (accepted) return;

    const backdrop = this.$('disclaimerBackdrop');
    if (!backdrop) return;

    // Localize modal text
    const isAr = this.lang === 'ar';
    this.$('discTitle').textContent = isAr ? 'مهم قبل الاستخدام' : 'Important Before Use';
    this.$('discIntro').textContent = isAr
      ? 'معين أداة تقييم ذاتي تعليمية، وليست تشخيصا طبيا.'
      : "Mo'een is a self-assessment educational tool, not a medical diagnosis.";
    this.$('disc1').textContent = isAr
      ? 'النتائج تقديرية ولا تغني عن الطبيب/الأخصائي.'
      : 'Results are indicative and do not replace a clinician.';
    this.$('disc2').textContent = isAr
      ? 'لو عندك أفكار بإيذاء النفس أو خطر عاجل—اتواصل فورا مع شخص قريب أو جهة طوارئ.'
      : 'If you have self-harm thoughts or urgent danger—reach out immediately to someone you trust or emergency services.';
    this.$('disc3').textContent = isAr
      ? 'بياناتك بتتخزن على جهازك فقط (LocalStorage) مش على سيرفر.'
      : 'Your data is stored locally on your device (LocalStorage), not on a server.';
    this.$('discOk').textContent = isAr ? 'موافق' : 'I Understand';

    backdrop.classList.remove('hidden');

    this.$('discOk').onclick = () => {
      storage.setItem(key, '1');
      backdrop.classList.add('hidden');
    };
  }
  // --- END DISCLAIMER ---

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', this.theme);
    storage.setItem(STORAGE.theme, this.theme);
    this.$('themeToggle').textContent = this.theme === 'dark' ? '☀' : '☾';
    // Re-render charts to use new theme colors
    if (this.currentReport) this.renderChart(this.currentReport.results);
    if (document.querySelector('#history.active')) this.renderHistoryChart(safeJsonParse(storage.getItem(this.getHistoryKey()), []).reverse());
  }

  showSection(id) {
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    this.$(id).classList.add('active');
    
    // Control Floating Action Bar visibility
    this.$('actionBar').style.display = id === 'result' ? 'flex' : 'none';
  }

  startTest() {
    const name = this.$('nameInput').value;
    const age = this.$('ageInput').value;
    const gender = this.$('genderInput').value;

    if(!age || !name) return alert(this.lang === 'ar' ? "الاسم والعمر مطلوبان" : "Name and Age are required");
    
    if(this.mode === 'single') {
      this.targetDomain = this.$('domainInput').value;
      if(!this.targetDomain) return alert(this.lang === 'ar' ? "الرجاء اختيار محور التركيز" : "Please select a focus domain");
      this.qList = this.model.questions.filter(q => q.d === this.targetDomain);
    } else {
      this.qList = this.model.questions;
    }
    
    if (this.qList.length === 0) return alert(this.lang === 'ar' ? "لا توجد أسئلة متاحة لهذا الوضع." : "No questions available for this mode.");

    this.userData = { name, age, gender };
    this.currIdx = 0;
    this.answers = {};
    
    this.showSection('test');
    this.renderQuestion();
  }
  
  renderQuestion() {
    const q = this.qList[this.currIdx];
    this.$('qDomainBadge').textContent = this.model.config.domains[q.d][this.lang];
    this.$('qCounter').textContent = `${this.currIdx + 1} / ${this.qList.length}`;
        const denom = Math.max(1, this.qList.length - 1);
    this.$('progressBar').style.width = `${((this.currIdx)/denom)*100}%`;
    
    const txt = this.$('qText');
    txt.style.opacity = 0;
    setTimeout(() => {
      txt.textContent = q[this.lang];
      txt.style.opacity = 1;
    }, 200);

    const con = this.$('optionsContainer');
    con.innerHTML = '';
    this.model.config.options.forEach(opt => {
      let card = document.createElement('div');
      card.className = 'opt-card';
      card.innerHTML = `<div class="opt-emoji">${opt.emoji}</div><div class="opt-label">${opt[this.lang]}</div>`;
      
      if(this.answers[this.currIdx] === opt.val) card.classList.add('selected');

      card.onclick = () => {
        this.answers[this.currIdx] = opt.val;
        document.querySelectorAll('.opt-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        setTimeout(() => this.nextQ(), 300);
      };
      con.appendChild(card);
    });
  }

  // NEW: TTS Function
  readQuestion() {
    const q = this.qList[this.currIdx];
    const text = q[this.lang];
    
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = this.lang === 'ar' ? 'ar-SA' : 'en-US';
        // Stop any current speaking before starting a new one
        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
        }
        speechSynthesis.speak(utterance);
    } else {
        alert(this.lang === 'ar' ? 'متصفحك لا يدعم خاصية قراءة النص.' : 'Your browser does not support text-to-speech.');
    }
  }
  // END NEW: TTS Function

  prevQ() {
    if(this.currIdx > 0) {
      this.currIdx--;
      this.renderQuestion();
    }
  }

  nextQ() {
    if(this.answers[this.currIdx] === undefined) return alert(this.lang === 'ar' ? "الرجاء اختيار إجابة" : "Please select an answer");

    if(this.currIdx < this.qList.length - 1) {
      this.currIdx++;
      this.renderQuestion();
    } else {
      this.openReview();
    }
  }


  skipQ() {
    // Mark as skipped (null) and move on
    this.answers[this.currIdx] = null;
    if(this.currIdx < this.qList.length - 1) {
      this.currIdx++;
      this.renderQuestion();
    } else {
      this.openReview();
    }
  }

  openReview() {
    this.renderReview();
    this.showSection('review');
  }

  renderReview() {
    const list = this.$('reviewList');
    const summary = this.$('reviewSummary');
    list.innerHTML = '';

    let unanswered = 0;
    for (let i = 0; i < this.qList.length; i++) {
      const q = this.qList[i];
      const a = this.answers[i];

      const isUnanswered = (a === undefined);
      if (isUnanswered) unanswered++;

      // Find option label
      let aLabel = this.lang === 'ar' ? 'غير مجاب' : 'Unanswered';
      if (a === null) aLabel = this.lang === 'ar' ? 'تم التخطي' : 'Skipped';
      if (typeof a === 'number') {
        const opt = this.model.config.options.find(o => o.val === a);
        aLabel = opt ? opt[this.lang] : aLabel;
      }

      const item = document.createElement('div');
      item.className = 'review-item' + (isUnanswered ? ' unanswered' : '');
      item.innerHTML = `
        <div class="num">${i+1}</div>
        <div class="meta">
          <div class="q">${q[this.lang]}</div>
          <div class="a">${this.lang === 'ar' ? 'الإجابة:' : 'Answer:'} ${aLabel}</div>
        </div>
        <button class="btn secondary jump">${this.lang === 'ar' ? 'تعديل' : 'Edit'}</button>
      `;
      item.querySelector('.jump').onclick = () => {
        this.currIdx = i;
        this.showSection('test');
        this.renderQuestion();
      };
      list.appendChild(item);
    }

    const total = this.qList.length;
    if (unanswered === 0) {
      summary.textContent = this.lang === 'ar' ? `كل الأسئلة تمت مراجعتها (${total}/${total}).` : `All questions reviewed (${total}/${total}).`;
    } else {
      summary.textContent = this.lang === 'ar'
        ? `فيه ${unanswered} سؤال لسه من غير إجابة. تقدر تكمل إنشاء التقرير وسيتم اعتبارها (0).`
        : `${unanswered} questions are unanswered. You can still generate the report; they will be treated as (0).`;
    }
  }

  finishFromReview() {
    // Fill any unanswered as 0 to avoid blocking
    for (let i = 0; i < this.qList.length; i++) {
      if (this.answers[i] === undefined || this.answers[i] === null) this.answers[i] = 0;
    }
    this.finish();
  }

  // --- END Test Flow ---

  finish() {
    let scores = { depression:0, anxiety:0, ocd:0, trauma:0 };
    let counts = { depression:0, anxiety:0, ocd:0, trauma:0 };
    
    this.qList.forEach((q, i) => {
      const domain = q.d;
      const answerValue = this.answers[i] || 0;
      scores[domain] += answerValue;
      if (counts[domain] === 0) counts[domain] = 0;
      counts[domain] += 3; 
    });

    let results = {};
    let totalScore = 0;
    let totalMaxScore = 0;

    Object.keys(scores).forEach(k => {
      if(counts[k] > 0) {
        // Calculate percentage for visualization and cutoffs
        results[k] = Math.round((scores[k] / counts[k]) * 100); 
        totalScore += scores[k];
        totalMaxScore += counts[k];
      } else {
        results[k] = 0;
      }
    });

    const finalScore = totalMaxScore > 0 ? Math.round((totalScore / totalMaxScore) * 100) : 0;
    
    const report = {
      id: Date.now(),
      date: new Date().toISOString(),
      user: this.userData,
      results,
      finalScore,
      qList: this.qList, 
      answers: this.answers
    };

    this.saveResult(report); 
    this.renderResult(report);
  }

  saveResult(report) {
    let hist = safeJsonParse(storage.getItem(this.getHistoryKey()), []);
    hist.push(report);
    storage.setItem(this.getHistoryKey(), JSON.stringify(hist));
  }

  renderResult(report) {
    this.currentReport = report; 
    this.showSection('result');
    
    const reportDate = new Date(report.date).toLocaleDateString(this.lang);
    this.$('resultMeta').textContent = `${report.user.name || (this.lang === 'ar' ? 'ضيف' : 'Guest')} | ${reportDate}`;
    const t = this.langText;

    // Disclaimer
    this.$('disclaimerTitle').textContent = t.disclaimerTitle;
    this.$('disclaimerText').textContent = t.disclaimerText;

    
    // Overall Clinical Level
    const levelText = getClinicalLevel(report.finalScore, this.lang, this.model);
    const p = this.$('overallScorePill');
    p.textContent = `${levelText} (${report.finalScore}%)`;
    p.className = `pill ${getSeverity(report.finalScore, this.model)}`;

    // Chart
    this.renderChart(report.results);

    // Heatmap (Language sensitive)
    const heat = this.$('riskHeatmap');
    heat.innerHTML = '';
    const domainsToRender = Object.keys(report.results).filter(k => report.results[k] > 0);
    
    if (domainsToRender.length === 0) { 
        heat.innerHTML = `<div class="text-muted" style="grid-column: span 2; text-align:center;">${this.lang === 'ar' ? 'لا يوجد تحليل مفصل متوفر.' : 'No detailed analysis available.'}</div>`;
    } else {
        domainsToRender.forEach(k => {
          let val = report.results[k];
          let level = getClinicalLevel(val, this.lang, this.model);
          let div = document.createElement('div');
          div.className = `card flat heat-cell ${getSeverity(val, this.model)}`;
          div.innerHTML = `
            <span style="font-weight: 700; color: var(--text);">${this.model.config.domains[k][this.lang]} (${this.model.config.domains[k].scale})</span>
            <span class="pill ${getSeverity(val, this.model)}" style="margin-inline-start: auto;">${level} (${val}%)</span>
          `;
          heat.appendChild(div);
        });
    }

    // Personalized Recommendations
    this.renderRecommendations(report);

    // Trend Analysis
    this.renderTrend(report);

    // Supportive Content (Show only if score is Moderate or Severe >= 30)
    this.$('supportiveContent').style.display = report.finalScore >= this.model.config.cutoffs.moderate ? 'block' : 'none';
    
    // Explainability (XAI)
    this.renderExplainability(report);

    // Emotion-aware UI accent (stable/warn/bad)
    this.applyEmotionTheme(report.finalScore);

    // Guided breathing widget (shown for moderate+ OR if user wants it)
    this.updateBreathingWidget(report);

    
    this.updateDoctorConnect(report);
// Safety Escalation (critical)
    this.checkEmergencyFromReport(report);

    // Reveal animation for result cards
    this.applyResultReveal();
  }


  // --- NEW: Emotion-aware theme + reveal animations + breathing + XAI + Safety ---
  applyEmotionTheme(score){
    const sev = getSeverity(score, this.model); // stable | warn | bad
    document.documentElement.setAttribute('data-state', sev);
  }

  applyResultReveal(){
    const root = this.$('reportContent') || this.$('result');
    if(!root) return;
    // mark key blocks
    const ids = [
      'trendBox','overallScorePill','explainCard','disclaimerCard','recommendationsCard',
      'chartCard','heatmapCard','supportCard','breathingWidget','doctorConnectCard'
    ];
    ids.forEach(id=>{
      const el = this.$(id);
      if(!el) return;
      el.classList.add('reveal');
      el.classList.remove('show');
    });
    // staged reveal
    let delay = 60;
    ids.forEach(id=>{
      const el = this.$(id);
      if(!el) return;
      setTimeout(()=> el.classList.add('show'), delay);
      delay += 90;
    });
  }

  renderExplainability(report){
    const card = this.$('explainCard');
    if(!card) return;

    // Build simple, transparent explanation from answered items
    const byDomain = { depression:[], anxiety:[], ocd:[], trauma:[] };
    (report.qList || []).forEach((q, i)=>{
      const a = (report.answers || [])[i];
      if(typeof a !== 'number') return;
      if(a >= 2) byDomain[q.d].push({q, a});
    });

    // Top 2 strongest domains (by percentage)
    const sorted = Object.keys(report.results).sort((a,b)=> (report.results[b]||0) - (report.results[a]||0));
    const top = sorted.filter(d => (report.results[d]||0) > 0).slice(0,2);

    const isAr = this.lang === 'ar';
    const title = this.$('explainTitle');
    const sum = this.$('explainSummary');
    const list = this.$('explainList');

    if(title) title.textContent = isAr ? '🔍 لماذا ظهرت هذه النتيجة؟' : '🔍 Why did this result appear?';

    const hasSignals = top.length && top.some(d => byDomain[d].length);
    if(!hasSignals){
      card.style.display = 'none';
      return;
    }

    card.style.display = 'block';
    if(sum){
      const topName = top.map(d => this.model.config.domains[d][this.lang]).join(isAr ? ' + ' : ' + ');
      sum.textContent = isAr
        ? `النتيجة اتأثرت أكتر بـ: ${topName}. (بنفس أسلوب الأسئلة، مش تشخيص طبي)`
        : `Most influenced by: ${topName}. (Question-based signals, not a medical diagnosis)`;
    }

    if(list){
      list.innerHTML = '';
      top.forEach(d=>{
        const items = byDomain[d].slice(0,3);
        if(!items.length) return;
        const li = document.createElement('li');
        li.innerHTML = `<b>${this.model.config.domains[d][this.lang]}:</b> ` + items.map(x=>{
          const qText = (x.q[this.lang] || '').trim();
          return `“${qText}”`;
        }).join(isAr ? '، ' : ', ');
        list.appendChild(li);
      });
      const li2 = document.createElement('li');
      li2.textContent = isAr
        ? 'ملاحظة: الأسئلة اللي اتجاوبت بدرجة عالية ليها تأثير أكبر على التصنيف.'
        : 'Note: Higher-intensity answers weigh more in the classification.';
      list.appendChild(li2);
    }
  }

  updateBreathingWidget(report){
    const wrap = this.$('breathingWidget');
    if(!wrap) return;

    const isAr = this.lang === 'ar';
    const show = report.finalScore >= this.model.config.cutoffs.moderate; // moderate+
    wrap.style.display = show ? 'block' : 'none';
    if(!show) return;

    // Localize texts
    const title = this.$('breathTitle');
    const sub = this.$('breathSub');
    const start = this.$('breathStartBtn');
    const stop = this.$('breathStopBtn');
    const skip = this.$('breathSkipBtn');
    const mood = this.$('guidedMoodBtn');
    const hist = this.$('guidedHistoryBtn');
    const neu = this.$('guidedNewBtn');

    if(title) title.textContent = isAr ? '🫁 تمرين تنفّس سريع' : '🫁 Quick breathing exercise';
    if(sub) sub.textContent = isAr
      ? 'جرّب تمرين 4-4-6 (شهيق 4 ثواني، حبس 4، زفير 6). هيهدّي الجسم بسرعة.'
      : 'Try 4-4-6 (inhale 4s, hold 4s, exhale 6s). It can calm your body quickly.';
    if(start) start.textContent = isAr ? 'ابدأ' : 'Start';
    if(stop) stop.textContent = isAr ? 'إيقاف' : 'Stop';
    if(skip) skip.textContent = isAr ? 'تخطي' : 'Skip';
    if(mood) mood.textContent = isAr ? 'سجّل مودك النهارده' : 'Log today’s mood';
    if(hist) hist.textContent = isAr ? 'شوف تاريخك' : 'View history';
    if(neu) neu.textContent = isAr ? 'تقييم جديد' : 'New assessment';

    // Wire actions (idempotent)
    if(!this._breathBound){
      this._breathBound = true;
      const startBtn = this.$('breathStartBtn');
      const stopBtn = this.$('breathStopBtn');
      const skipBtn = this.$('breathSkipBtn');

      startBtn && (startBtn.onclick = ()=> this.startBreathing());
      stopBtn && (stopBtn.onclick = ()=> this.stopBreathing(true));
      skipBtn && (skipBtn.onclick = ()=> {
        this.stopBreathing(false);
        this.$('breathingWidget').style.display = 'none';
      });

      const moodBtn = this.$('guidedMoodBtn');
      const histBtn = this.$('guidedHistoryBtn');
      const newBtn = this.$('guidedNewBtn');

      moodBtn && (moodBtn.onclick = ()=> { this.showSection('mood'); this.renderMood(); });
      histBtn && (histBtn.onclick = ()=> this.renderHistory());
      newBtn && (newBtn.onclick = ()=> this.newDiagnosis());
    }

    // Reset UI
    this.stopBreathing(false);
  }

  startBreathing(){
    if(this._breathTimer) return; // already running
    const circle = this.$('breathCircle');
    const phaseEl = this.$('breathPhase');
    const timerEl = this.$('breathTimer');
    const startBtn = this.$('breathStartBtn');
    const stopBtn = this.$('breathStopBtn');

    if(startBtn) startBtn.style.display = 'none';
    if(stopBtn) stopBtn.style.display = 'inline-block';

    const totalSec = 120; // 2 minutes
    let left = totalSec;

    const fmt = (s)=> `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
    if(timerEl) timerEl.textContent = fmt(left);

    // 4-4-6 cycle = 14s
    const phases = [
      {nameAr:'شهيق', nameEn:'Inhale', cls:'inhale', sec:4},
      {nameAr:'حبس', nameEn:'Hold', cls:'hold', sec:4},
      {nameAr:'زفير', nameEn:'Exhale', cls:'exhale', sec:6},
    ];
    let pi = 0;
    let psLeft = phases[0].sec;

    const setPhase = ()=>{
      const p = phases[pi];
      if(circle){
        circle.classList.remove('inhale','hold','exhale');
        circle.classList.add(p.cls);
      }
      if(phaseEl){
        phaseEl.textContent = (this.lang === 'ar') ? p.nameAr : p.nameEn;
      }
    };
    setPhase();

    this._breathTimer = setInterval(()=>{
      left -= 1;
      psLeft -= 1;

      if(timerEl) timerEl.textContent = fmt(Math.max(left,0));
      if(left <= 0){
        this.stopBreathing(true);
        return;
      }

      if(psLeft <= 0){
        pi = (pi + 1) % phases.length;
        psLeft = phases[pi].sec;
        setPhase();
      }
    }, 1000);
  }

  stopBreathing(resetText){
    const circle = this.$('breathCircle');
    const phaseEl = this.$('breathPhase');
    const timerEl = this.$('breathTimer');
    const startBtn = this.$('breathStartBtn');
    const stopBtn = this.$('breathStopBtn');

    if(this._breathTimer){
      clearInterval(this._breathTimer);
      this._breathTimer = null;
    }
    if(circle){
      circle.classList.remove('inhale','hold','exhale');
    }
    if(phaseEl){
      phaseEl.textContent = resetText ? ((this.lang === 'ar') ? 'تمام ✅' : 'Done ✅') : ((this.lang === 'ar') ? 'جاهز' : 'Ready');
    }
    if(timerEl){
      timerEl.textContent = '02:00';
    }
    if(startBtn) startBtn.style.display = 'inline-block';
    if(stopBtn) stopBtn.style.display = 'none';
  }

  checkEmergencyFromReport(report){
    // Only meaningful if depression domain exists in this run.
    const hasDep = (report.qList || []).some(q => q.d === 'depression');
    if(!hasDep) return;

    // If Q9 (depression id=9) is answered high (>=2), escalate.
    let q9Idx = -1;
    (report.qList || []).forEach((q,i)=>{ if(q.id === 9) q9Idx = i; });
    const q9 = q9Idx >= 0 ? (report.answers || [])[q9Idx] : 0;
    if(typeof q9 === 'number' && q9 >= 2){
      this.showEmergencyModal();
    }
  }

  showEmergencyModal(){
    const bd = this.$('emergencyBackdrop');
    if(!bd) return;
    bd.classList.remove('hidden');

    const close = this.$('emCloseBtn');
    const breathe = this.$('emBreatheBtn');

    if(close){
      close.onclick = ()=> bd.classList.add('hidden');
    }
    if(breathe){
      breathe.onclick = ()=> {
        bd.classList.add('hidden');
        this.showSection('result');
        const bw = this.$('breathingWidget');
        if(bw){
          bw.style.display = 'block';
          bw.scrollIntoView({behavior:'smooth', block:'start'});
          setTimeout(()=> this.startBreathing(), 350);
        }
      };
    }
  }
    buildReferralText(report){
    const isAr = this.lang === 'ar';
    const name = report?.user?.name || (isAr ? 'مستخدم' : 'User');
    const date = new Date(report.date).toLocaleString(this.lang);
    const modelName = this.model?.config?.name?.[this.lang] || 'Mo’een';

    // pick top domain
    const domains = report?.results || {};
    const sorted = Object.keys(domains).sort((a,b)=> (domains[b]||0) - (domains[a]||0));
    const top = sorted[0] || '';
    const topLabel = top ? this.model.config.domains[top][this.lang] : (isAr ? 'غير محدد' : 'N/A');
    const topVal = top ? (domains[top]||0) : 0;

    const overall = report?.finalScore ?? 0;
    const sev = getClinicalLevel(overall, this.lang, this.model);

    // suggested specialist
    let specialist = isAr ? 'أخصائي نفسي' : 'Psychologist';
    if(top === 'depression' || top === 'trauma') specialist = isAr ? 'طبيب نفسي' : 'Psychiatrist';
    if(top === 'ocd') specialist = isAr ? 'أخصائي CBT / طبيب نفسي' : 'CBT therapist / Psychiatrist';

    const bullets = [
      isAr ? `الاسم: ${name}` : `Name: ${name}`,
      isAr ? `التاريخ: ${date}` : `Date: ${date}`,
      isAr ? `نتيجة عامة: ${sev} (${overall}%)` : `Overall: ${sev} (${overall}%)`,
      isAr ? `أعلى مجال: ${topLabel} (${topVal}%)` : `Top domain: ${topLabel} (${topVal}%)`,
      isAr ? `مقترح: ${specialist}` : `Suggested: ${specialist}`,
      isAr ? `ملاحظة: هذا تقرير تقييم ذاتي للتوجيه وليس تشخيصًا.` : `Note: Self-assessment for guidance, not a diagnosis.`
    ];

    return (isAr
      ? `مرحبًا دكتور/دكتورة،
أنا استخدمت ${modelName} لتقييم ذاتي سريع وأحتاج استشارة.

${bullets.map(b=>'• '+b).join('\n')}

ملخص قصير من المستخدم:
(اكتب هنا أهم الأعراض/المدة/أي شيء مهم)`
      : `Hello Doctor,
I used ${modelName} for a quick self-assessment and would like a consultation.

${bullets.map(b=>'• '+b).join('\n')}

Short user summary:
(Write main symptoms/duration/anything important)`
    );
  }

  bindDoctorConnect(){
    if(this._docBound) return;
    this._docBound = true;

    const copyBtn = this.$('docCopyBtn');
    const waBtn = this.$('docWhatsappBtn');
    const emailBtn = this.$('docEmailBtn');
    const cityInput = this.$('docCityInput');
    const specSelect = this.$('docSpecSelect');
    const extBtn = this.$('docExternalSearchBtn');

    copyBtn && (copyBtn.onclick = async ()=>{
      const txt = this.$('docReferralText')?.value || '';
      try{
        await navigator.clipboard.writeText(txt);
        copyBtn.textContent = (this.lang==='ar') ? '✅ تم النسخ' : '✅ Copied';
        setTimeout(()=> copyBtn.textContent = (this.lang==='ar') ? '📋 نسخ الرسالة' : '📋 Copy', 1200);
      }catch(_){
        alert(this.lang==='ar' ? 'لم يتم النسخ. جرّب يدويًا.' : 'Copy failed. Please copy manually.');
      }
    });

    
// Update directory + external search (best-effort)
const updateSearch = ()=>{
  const report = this.currentReport || {results:{}, finalScore:0, date:Date.now(), user:{}};
  this.renderDoctorDirectory(report);

  if(extBtn){
    const city = (cityInput?.value || '').trim();
    const spec = specSelect?.value || 'psychiatrist';
    const q = encodeURIComponent((spec==='psychiatrist'?'طبيب نفسي':'أخصائي نفسي') + (city?(' '+city):''));
    extBtn.href = `https://www.google.com/search?q=${q}`;
  }
};
cityInput && (cityInput.oninput = updateSearch);
specSelect && (specSelect.onchange = updateSearch);

const feeSelect = this.$('docFeeSelect');
const searchInput = this.$('docSearchInput');
feeSelect && (feeSelect.onchange = updateSearch);
searchInput && (searchInput.oninput = updateSearch);

updateSearch();

    // WA link + email link update happens in updateDoctorConnect()
  }

  updateDoctorConnect(report){
    const card = this.$('doctorConnectCard');
    if(!card) return;

    const isAr = this.lang === 'ar';

    // Show for moderate+ OR if emergency was triggered
    const show = (report.finalScore >= this.model.config.cutoffs.moderate);
    card.style.display = show ? 'block' : 'none';
    if(!show) return;

    // Localize labels quickly
    const t1 = this.$('docConnectTitle');
    const t2 = this.$('docConnectSub');
    const copyBtn = this.$('docCopyBtn');
    if(t1) t1.textContent = isAr ? '🩺 تواصل مع مختص' : '🩺 Contact a specialist';
    if(t2) t2.textContent = isAr
      ? 'معين لا يُغني عن الطبيب. جهّزنا لك رسالة مختصرة تقدر تبعتها لدكتور عبر واتساب أو إيميل.'
      : 'Mo’een doesn’t replace a clinician. We prepared a short referral message you can send via WhatsApp or email.';
    if(copyBtn) copyBtn.textContent = isAr ? '📋 نسخ الرسالة' : '📋 Copy';

    // Build referral message
    const msg = this.buildReferralText(report);
    const ta = this.$('docReferralText');
    if(ta) ta.value = msg;

    // WhatsApp link (no phone number; user chooses doctor)
    const wa = this.$('docWhatsappBtn');
    if(wa){
      wa.textContent = isAr ? 'واتساب' : 'WhatsApp';
      wa.href = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    }

    // Email link
    const em = this.$('docEmailBtn');
    if(em){
      em.textContent = isAr ? 'إيميل' : 'Email';
      const subject = isAr ? 'طلب استشارة (Mo’een Referral)' : 'Consultation request (Mo’een Referral)';
      em.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(msg)}`;
    }

    this.bindDoctorConnect();
  }

getDoctorDirectory(){
  // Demo dataset (Egypt-focused). Replace with DB later (Railway).
  return [
    {nameAr:'د/ أحمد سامي', nameEn:'Dr. Ahmed Samy', spec:'psychiatrist', cityAr:'القاهرة', cityEn:'Cairo', clinicAr:'عيادة المعادي', clinicEn:'Maadi Clinic', fee:650, wa:'+201000000001', email:'clinic1@example.com', rating:4.7},
    {nameAr:'د/ مريم حسن', nameEn:'Dr. Mariam Hassan', spec:'psychiatrist', cityAr:'الجيزة', cityEn:'Giza', clinicAr:'الدقي', clinicEn:'Dokki', fee:500, wa:'+201000000002', email:'clinic2@example.com', rating:4.5},
    {nameAr:'أ/ يوسف علي', nameEn:'Youssef Ali', spec:'psychologist', cityAr:'الإسكندرية', cityEn:'Alexandria', clinicAr:'سموحة', clinicEn:'Smouha', fee:350, wa:'+201000000003', email:'clinic3@example.com', rating:4.6},
    {nameAr:'أ/ نهى إبراهيم', nameEn:'Noha Ibrahim', spec:'psychologist', cityAr:'القاهرة', cityEn:'Cairo', clinicAr:'مدينة نصر', clinicEn:'Nasr City', fee:300, wa:'+201000000004', email:'clinic4@example.com', rating:4.4},
    {nameAr:'أ/ محمود رجب', nameEn:'Mahmoud Ragab', spec:'counselor', cityAr:'الشرقية', cityEn:'Sharqia', clinicAr:'الزقازيق', clinicEn:'Zagazig', fee:200, wa:'+201000000005', email:'clinic5@example.com', rating:4.3},
    {nameAr:'د/ خالد عبد الله', nameEn:'Dr. Khaled Abdallah', spec:'psychiatrist', cityAr:'المنصورة', cityEn:'Mansoura', clinicAr:'شارع الجمهورية', clinicEn:'El Gomhoria St.', fee:700, wa:'+201000000006', email:'clinic6@example.com', rating:4.8},
    {nameAr:'أ/ سارة عبد الرحمن', nameEn:'Sara Abdelrahman', spec:'psychologist', cityAr:'طنطا', cityEn:'Tanta', clinicAr:'شارع البحر', clinicEn:'El Bahr St.', fee:280, wa:'+201000000007', email:'clinic7@example.com', rating:4.2},
    {nameAr:'أ/ محمد شريف', nameEn:'Mohamed Sherif', spec:'counselor', cityAr:'القاهرة', cityEn:'Cairo', clinicAr:'شبرا', clinicEn:'Shubra', fee:180, wa:'+201000000008', email:'clinic8@example.com', rating:4.1},
  ];
}

renderDoctorDirectory(report){
  const list = this.$('docDirectoryList');
  if(!list) return;

  const isAr = this.lang === 'ar';
  const data = this.getDoctorDirectory();

  const city = (this.$('docCityInput')?.value || '').trim();
  const spec = (this.$('docSpecSelect')?.value || 'psychiatrist');
  const fee = (this.$('docFeeSelect')?.value || 'any');
  const q = (this.$('docSearchInput')?.value || '').trim().toLowerCase();

  const inCity = (d)=>{
    if(!city) return true;
    const c = isAr ? d.cityAr : d.cityEn;
    return (c || '').includes(city);
  };

  const inFee = (d)=>{
    if(fee === 'any') return true;
    if(fee === '800+') return d.fee >= 800;
    const parts = fee.split('-');
    const a = parseInt(parts[0],10);
    const b = parseInt(parts[1],10);
    return d.fee >= a && d.fee <= b;
  };

  const inQuery = (d)=>{
    if(!q) return true;
    const s = (isAr ? (d.nameAr + ' ' + d.clinicAr) : (d.nameEn + ' ' + d.clinicEn)).toLowerCase();
    return s.includes(q);
  };

  const specLabel = (v)=>{
    if(v==='psychiatrist') return isAr ? 'طبيب نفسي' : 'Psychiatrist';
    if(v==='psychologist') return isAr ? 'أخصائي نفسي' : 'Psychologist';
    return isAr ? 'إرشاد/استشارات' : 'Counselor';
  };

  let filtered = data
    .filter(d => d.spec === spec)
    .filter(inCity)
    .filter(inFee)
    .filter(inQuery)
    .sort((a,b)=> (b.rating||0) - (a.rating||0));

  list.innerHTML = '';
  if(filtered.length === 0){
    list.innerHTML = `<div class="text-muted" style="text-align:center;">${isAr ? 'لا يوجد نتائج مطابقة. جرّب تغيّر الفلاتر.' : 'No matches. Try changing filters.'}</div>`;
    return;
  }

  const referral = this.$('docReferralText')?.value || this.buildReferralText(report);

  filtered.slice(0,6).forEach(d=>{
    const card = document.createElement('div');
    card.className = 'docCard';

    const name = isAr ? d.nameAr : d.nameEn;
    const cityL = isAr ? d.cityAr : d.cityEn;
    const clinic = isAr ? d.clinicAr : d.clinicEn;

    const waLink = d.wa ? `https://wa.me/${d.wa.replace(/\D/g,'')}?text=${encodeURIComponent(referral)}` : `https://wa.me/?text=${encodeURIComponent(referral)}`;
    const subject = isAr ? "طلب استشارة (Moa'een Referral)" : "Consultation request (Moa'een Referral)";
    const emailTo = d.email || '';
    const emailLink = `mailto:${encodeURIComponent(emailTo)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(referral)}`;

    card.innerHTML = `
      <div class="top">
        <div>
          <div class="name">${name}</div>
          <div class="meta">${specLabel(d.spec)} • ${clinic} • ${cityL}</div>
        </div>
        <div class="pill good" style="white-space:nowrap;">${(d.rating||0).toFixed(1)} ★</div>
      </div>

      <div class="docTags">
        <span class="tag">${isAr ? 'كشف' : 'Fee'}: ${d.fee} ${isAr ? 'ج.م' : 'EGP'}</span>
        <span class="tag">${isAr ? 'تواصل سريع' : 'Quick contact'}</span>
      </div>

      <div class="docActions">
        <button class="btn" type="button" data-doc='${encodeURIComponent(JSON.stringify(d))}'>${isAr ? "📅 احجز / عن بُعد" : "📅 Book / Remote"}</button>
        <a class="btn primary" target="_blank" rel="noopener" href="${waLink}">${isAr ? 'واتساب' : 'WhatsApp'}</a>
        <a class="btn secondary" href="${emailLink}">${isAr ? 'إيميل' : 'Email'}</a>
      </div>
    `;
    list.appendChild(card);
  });
// Booking click delegation (robust)
if(!list.dataset.bookDelegation){
  list.dataset.bookDelegation = '1';
  list.addEventListener('click', (e)=>{
    const btn = e.target.closest('[data-doc]');
    if(!btn) return;
    e.preventDefault();
    e.stopPropagation();
    try{
      const raw = decodeURIComponent(btn.getAttribute('data-doc') || '');
      const doc = JSON.parse(raw);
      this.openBookingModal(doc);
    }catch(err){
      console.warn(err);
      this.openBookingModal(null);
    }
  }, true);
}
}

// =======================
// 📅 Appointments & Tele-consultation
// =======================
getAppointmentsKey(){
  const uid = this.currentUserId || 'default';
  return `moa_een_appointments_${uid}`;
}
getAppointments(){
  return safeJsonParse(storage.getItem(this.getAppointmentsKey()), []);
}
saveAppointments(list){
  storage.setItem(this.getAppointmentsKey(), JSON.stringify(list || []));
}
openAppointments(){
  this.renderAppointments();
  this.showSection('appointments');
}
renderAppointments(){
  const listEl = this.$('apptList');
  const emptyEl = this.$('apptEmpty');
  if(!listEl || !emptyEl) return;

  const isAr = this.lang === 'ar';
  const appts = this.getAppointments().sort((a,b)=> (b.ts||0) - (a.ts||0));

  listEl.innerHTML = '';
  emptyEl.style.display = appts.length ? 'none' : 'block';
  if(!appts.length) return;

  const typeMap = {
    video: isAr ? '📹 استشارة فيديو' : '📹 Video consult',
    phone: isAr ? '📞 مكالمة' : '📞 Phone call',
    chat:  isAr ? '💬 شات (واتساب)' : '💬 Chat (WhatsApp)',
    visit: isAr ? '🏥 كشف في العيادة' : '🏥 In-clinic visit'
  };

  appts.forEach(a=>{
    const card = document.createElement('div');
    card.className = 'apptCard';

    const dt = new Date(a.datetime).toLocaleString(isAr ? 'ar-EG' : 'en-US');

    card.innerHTML = `
      <div class="top">
        <div>
          <div class="title">${escapeHtml(a.doctorName || (isAr?'مختص':'Specialist'))}</div>
          <div class="meta">${typeMap[a.type] || a.type} • ${dt}</div>
          <div class="meta">${a.city ? ('📍 ' + escapeHtml(a.city)) : ''}${a.fee ? (' • ' + a.fee + (isAr?' ج.م':' EGP')) : ''}</div>
        </div>
        <div class="pill stable" style="white-space:nowrap;">${a.status || (isAr?'مؤكد':'Confirmed')}</div>
      </div>
      ${a.notes ? `<div class="meta" style="margin-top:8px;">📝 ${escapeHtml(a.notes)}</div>` : ``}
      <div class="apptActions">
        ${a.meetingUrl ? `<a class="btn" target="_blank" rel="noopener" href="${a.meetingUrl}">${isAr?'فتح الرابط':'Open link'}</a>` : ``}
        ${a.waUrl ? `<a class="btn secondary" target="_blank" rel="noopener" href="${a.waUrl}">${isAr?'واتساب':'WhatsApp'}</a>` : ``}
        <button class="btn secondary" data-cancel="${a.id}">${isAr?'إلغاء':'Cancel'}</button>
      </div>
    `;
    listEl.appendChild(card);
  });

  listEl.querySelectorAll('[data-cancel]').forEach(btn=>{
    btn.onclick = ()=>{
      const id = btn.getAttribute('data-cancel');
      const next = this.getAppointments().filter(x => x.id !== id);
      this.saveAppointments(next);
      this.renderAppointments();
    };
  });
}
generateMeetingLink(){
  const rnd = Math.random().toString(36).slice(2,10);
  return `https://meet.jit.si/Moa-een-${rnd}`;
}
openBookingModal(doctor){
  const bd = this.$('bookingBackdrop');
  if(!bd) return;
  bd.classList.remove('hidden');

  this._bookingDoctor = doctor || null;

  const isAr = this.lang === 'ar';
  const line = this.$('bkDoctorLine');
  const typeEl = this.$('bkType');
  const dateEl = this.$('bkDate');
  const timeEl = this.$('bkTime');
  const notesEl = this.$('bkNotes');
  const prevTxt = this.$('bkPreviewText');

  const docName = doctor ? (isAr ? doctor.nameAr : doctor.nameEn) : (isAr?'مختص':'Specialist');
  const docCity = doctor ? (isAr ? doctor.cityAr : doctor.cityEn) : '';
  if(line) line.textContent = isAr ? `مع: ${docName}${docCity ? ' • ' + docCity : ''}` : `With: ${docName}${docCity ? ' • ' + docCity : ''}`;

  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24*3600*1000);
  const yyyy = tomorrow.getFullYear();
  const mm = String(tomorrow.getMonth()+1).padStart(2,'0');
  const dd = String(tomorrow.getDate()).padStart(2,'0');
  if(dateEl && !dateEl.value) dateEl.value = `${yyyy}-${mm}-${dd}`;
  if(timeEl && !timeEl.value) timeEl.value = `18:00`;
  if(notesEl) notesEl.value = '';

  const updatePreview = ()=>{
    const t = typeEl?.value || 'video';
    if(!prevTxt) return;
    if(t === 'video'){
      prevTxt.textContent = isAr ? 'سيتم إنشاء رابط Jitsi تلقائيًا عند تأكيد الحجز.' : 'A Jitsi link will be generated on confirm.';
    } else if (t === 'chat'){
      prevTxt.textContent = isAr ? 'هيتم فتح واتساب برسالة إحالة جاهزة.' : 'WhatsApp will open with a referral message.';
    } else {
      prevTxt.textContent = isAr ? 'حجز موعد فقط (بدون رابط).' : 'Booking only (no link).';
    }
  };
  typeEl && (typeEl.onchange = updatePreview);
  updatePreview();

  const cancelBtn = this.$('bkCancelBtn');
  const confirmBtn = this.$('bkConfirmBtn');
  cancelBtn && (cancelBtn.onclick = ()=> bd.classList.add('hidden'));
  confirmBtn && (confirmBtn.onclick = ()=> this.confirmBooking());
}
confirmBooking(){
  const bd = this.$('bookingBackdrop');
  const typeEl = this.$('bkType');
  const dateEl = this.$('bkDate');
  const timeEl = this.$('bkTime');
  const notesEl = this.$('bkNotes');

  const type = typeEl?.value || 'video';
  const date = dateEl?.value;
  const time = timeEl?.value;
  if(!date || !time){
    alert(this.lang === 'ar' ? 'من فضلك اختر التاريخ والوقت.' : 'Please select date and time.');
    return;
  }
  const datetime = new Date(`${date}T${time}:00`);
  const doctor = this._bookingDoctor;

  const isAr = this.lang === 'ar';
  const docName = doctor ? (isAr ? doctor.nameAr : doctor.nameEn) : (isAr?'مختص':'Specialist');
  const city = doctor ? (isAr ? doctor.cityAr : doctor.cityEn) : '';
  const fee = doctor ? doctor.fee : null;

  const referral = this.$('docReferralText')?.value || (this.currentReport ? this.buildReferralText(this.currentReport) : '');
  const appt = {
    id: 'a_' + Math.random().toString(36).slice(2,10),
    ts: Date.now(),
    type,
    datetime: datetime.toISOString(),
    doctorName: docName,
    city,
    fee,
    notes: (notesEl?.value || '').trim(),
    status: (this.lang==='ar') ? 'مؤكد' : 'Confirmed'
  };

  if(type === 'video'){
    appt.meetingUrl = this.generateMeetingLink();
  } else if (type === 'chat'){
    const msg = referral || (isAr ? 'مرحبًا، أحتاج استشارة.' : 'Hello, I need a consultation.');
    const phone = doctor?.wa ? doctor.wa.replace(/\D/g,'') : '';
    appt.waUrl = phone ? `https://wa.me/${phone}?text=${encodeURIComponent(msg)}` : `https://wa.me/?text=${encodeURIComponent(msg)}`;
  }

  const all = this.getAppointments();
  all.unshift(appt);
  this.saveAppointments(all);

  if(bd) bd.classList.add('hidden');

  this.openAppointments();

  if(appt.meetingUrl){
    window.open(appt.meetingUrl, '_blank', 'noopener');
  } else if (appt.waUrl){
    window.open(appt.waUrl, '_blank', 'noopener');
  }
}

// --- END NEW ---

  renderChart(data) {
    const ctx = this.$('resultChart').getContext('2d');
    if(this.chart) this.chart.destroy();
    
    const labels = Object.keys(this.model.config.domains).map(k => this.model.config.domains[k][this.lang]);
    const values = Object.keys(this.model.config.domains).map(k => data[k]);
    // Map colors to severity levels
    const colors = values.map(v => {
        const severity = getSeverity(v, this.model);
        // Using explicit RGB/RGBA values for better cross-theme chart reliability
        if (severity === 'bad') return 'rgba(248, 113, 113, 0.8)';
        if (severity === 'warn') return 'rgba(251, 191, 36, 0.8)';
        return 'rgba(74, 222, 128, 0.8)';
    }); 
    
    // Determine axis color based on current theme for chart visibility
    const axisColor = document.documentElement.getAttribute('data-theme') === 'dark' ? '#94a3b8' : '#64748b';
    const gridColor = document.documentElement.getAttribute('data-theme') === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

    // Fallback if Chart.js failed to load (offline / blocked CDN)
    if (typeof Chart === 'undefined') {
      const container = this.$('resultChartContainer');
      if (container) {
        // Clear and render a simple HTML bar chart
        container.innerHTML = '';
        const list = document.createElement('div');
        list.style.display = 'grid';
        list.style.gap = '10px';
        labels.forEach((lab, i) => {
          const row = document.createElement('div');
          row.style.display = 'grid';
          row.style.gridTemplateColumns = '140px 1fr 60px';
          row.style.alignItems = 'center';
          row.style.gap = '10px';

          const name = document.createElement('div');
          name.textContent = lab;
          name.style.fontWeight = '600';

          const barWrap = document.createElement('div');
          barWrap.style.height = '10px';
          barWrap.style.borderRadius = '999px';
          barWrap.style.background = 'rgba(0,0,0,0.08)';
          barWrap.style.overflow = 'hidden';

          const bar = document.createElement('div');
          const v = Math.max(0, Math.min(100, Number(values[i] || 0)));
          bar.style.width = v + '%';
          bar.style.height = '100%';
          bar.style.background = 'rgba(16,185,129,0.85)';
          barWrap.appendChild(bar);

          const val = document.createElement('div');
          val.textContent = (values[i] ?? 0) + '%';
          val.style.textAlign = 'end';
          val.style.fontVariantNumeric = 'tabular-nums';

          row.appendChild(name);
          row.appendChild(barWrap);
          row.appendChild(val);
          list.appendChild(row);
        });
        container.appendChild(list);
      }
      return;
    }

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: this.lang === 'ar' ? 'النتيجة %' : 'Score %',
          data: values,
          backgroundColor: colors,
          borderColor: colors.map(c => c.replace('0.8', '1')),
          borderWidth: 1,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { 
            y: { 
                beginAtZero: true, 
                max: 100,
                grid: { color: gridColor },
                ticks: { color: axisColor }
            },
            x: {
                grid: { display: false },
                ticks: { color: axisColor }
            }
        },
        plugins: { legend: { display: false } }
      }
    });
  }


  renderRecommendations(report) {
    const t = this.langText;
    const card = this.$('recommendationsCard');
    const title = this.$('recoTitle');
    const summary = this.$('recoSummary');
    const list = this.$('recoList');

    title.textContent = t.recoTitle;
    summary.textContent = t.recoSummary;
    list.innerHTML = '';

    const cut = this.model?.config?.cutoffs || { mild: 15, moderate: 30, severe: 50 };

    // If overall is low and no domain is elevated, show a simple message
    const entries = Object.keys(this.model.config.domains).map(k => ({ k, v: Number(report.results?.[k] ?? 0) }));
    const elevated = entries.filter(x => x.v >= cut.mild).sort((a, b) => b.v - a.v);

    if (report.finalScore < cut.mild && elevated.length === 0) {
      card.style.display = 'block';
      list.innerHTML = `<li>${t.recoNone}</li>`;
      return;
    }

    card.style.display = 'block';

    // Pick top 2-3 domains
    const top = elevated.slice(0, 3);

    const tips = {
      depression: {
        ar: [
          "حاول تثبيت روتين نوم منتظم (نفس موعد النوم والاستيقاظ).",
          "ابدأ بنشاط بسيط يوميا (مشي 10–15 دقيقة) وراقب تأثيره على مزاجك.",
          "قسم المهام الكبيرة لخطوات صغيرة جدا لتقليل الإحباط."
        ],
        en: [
          "Keep a consistent sleep routine (same sleep/wake times).",
          "Start with a small daily activity (10–15 min walk) and track mood changes.",
          "Break big tasks into very small steps to reduce overwhelm."
        ]
      },
      anxiety: {
        ar: [
          "جرب تنفس 4-6: شهيق 4 ثواني، زفير 6 ثواني لمدة 2–3 دقائق.",
          "قلل المنبهات (كافيين/نيكوتين) خصوصا بعد العصر.",
          "اكتب 3 أشياء تحت سيطرتك الآن وابدأ بأبسط واحدة."
        ],
        en: [
          "Try 4-6 breathing: inhale 4s, exhale 6s for 2–3 minutes.",
          "Reduce stimulants (caffeine/nicotine), especially later in the day.",
          "Write 3 controllable items right now and start with the easiest."
        ]
      },
      ocd: {
        ar: [
          "لاحظ الفكرة الوسواسية بدون مجاراة الفعل القهري (تأخير الاستجابة 1–2 دقيقة).",
          "سجل: (الفكرة) → (القلق) → (التصرف) لملاحظة النمط.",
          "تدريب تدريجي: قلل طقوس التحقق خطوة صغيرة كل يوم."
        ],
        en: [
          "Notice the intrusive thought without performing the compulsion (delay response 1–2 min).",
          "Log: (thought) → (anxiety) → (action) to observe patterns.",
          "Gradual practice: reduce checking rituals by one small step daily."
        ]
      },
      trauma: {
        ar: [
          "لو في محفزات (Triggers)، جرب تقنية 5-4-3-2-1 للعودة للحاضر.",
          "تجنب العزلة: تواصل مع شخص آمن أو اكتب ما تشعر به لمدة 5 دقائق.",
          "لو الكوابيس/الذكريات متكررة، الدعم المتخصص مهم جدا."
        ],
        en: [
          "If you have triggers, try the 5-4-3-2-1 grounding technique.",
          "Avoid isolation: reach out to a safe person or journal for 5 minutes.",
          "If nightmares/flashbacks are frequent, professional support is strongly recommended."
        ]
      }
    };

    // Add domain-based tips
    top.forEach(({ k, v }) => {
      const dLabel = this.model.config.domains[k]?.[this.lang] || k;
      const level = getClinicalLevel(v, this.lang, this.model);
      const header = document.createElement('li');
      header.style.fontWeight = '800';
      header.textContent = `${dLabel}: ${level} (${v}%)`;
      list.appendChild(header);

      const arr = (tips[k] && tips[k][this.lang]) ? tips[k][this.lang] : [];
      arr.slice(0, 3).forEach(line => {
        const li = document.createElement('li');
        li.textContent = line;
        list.appendChild(li);
      });

      if (v >= cut.severe) {
        const li = document.createElement('li');
        li.style.fontWeight = '700';
        li.textContent = this.lang === 'ar'
          ? "⚠️ المستوى شديد: يفضل التواصل مع مختص (طبيب/معالج) في أقرب وقت."
          : "⚠️ Severe level: consider contacting a clinician/therapist as soon as possible.";
        list.appendChild(li);
      }
    });
  }

  renderTrend(current) {
    let hist = safeJsonParse(storage.getItem(this.getHistoryKey()), []);
    // Filter history by the current user's name
    const prevResults = hist.filter(h => h.id !== current.id && h.user.name === current.user.name); 

    if(prevResults.length < 1) {
      this.$('trendBox').style.display = 'none';
      const detailsCard = this.$('trendDetailsCard');
      const detailsList = this.$('trendDetailsList');
      if (detailsCard && detailsList) {
        detailsCard.style.display = 'block';
        detailsList.innerHTML = `<li>${this.langText.trendDetailsNone}</li>`;
      }
      return;
    }
    
    const prev = prevResults[prevResults.length - 1];

    // --- Domain-by-domain trend details ---
    const detailsCard = this.$('trendDetailsCard');
    const detailsList = this.$('trendDetailsList');
    if (detailsCard && detailsList) {
      detailsList.innerHTML = '';
      detailsCard.style.display = 'block';

      const keys = Object.keys(this.model.config.domains);
      keys.forEach(k => {
        const name = this.model.config.domains[k][this.lang];
        const curV = Number(current.results?.[k] ?? 0);
        const prevV = Number(prev.results?.[k] ?? 0);
        const d = Math.round(curV - prevV);

        let line = '';
        if (d > 5) line = this.langText.trendDomainUp(name, d);
        else if (d < -5) line = this.langText.trendDomainDown(name, d);
        else line = this.langText.trendDomainStable(name);

        const li = document.createElement('li');
        li.textContent = line;
        detailsList.appendChild(li);
      });
    }

    const diff = current.finalScore - prev.finalScore;
    const txt = this.$('trendText');
    this.$('trendBox').style.display = 'flex';

    if(diff > 5) {
      txt.textContent = this.langText.trendUp(diff);
      txt.style.color = 'var(--bad)';
    } else if (diff < -5) {
      txt.textContent = this.langText.trendDown(diff);
      txt.style.color = 'var(--good)';
    } else {
      txt.textContent = this.langText.trendStable;
      txt.style.color = 'var(--muted)';
    }
  }

  renderHistory() {
    this.showSection('history');
    const list = this.$('historyList');
    list.innerHTML = '';
    const hist = safeJsonParse(storage.getItem(this.getHistoryKey()), []).reverse(); 
    
    // NEW: Render the chart first
    this.renderHistoryChart(hist);

    if(hist.length === 0) {
        list.innerHTML = `<div class="text-muted" style="text-align:center">${this.lang === 'ar' ? 'لا يوجد سجلات محفوظة.' : 'No records saved.'}</div>`;
        this.$('exportCsvBtn').style.display = 'none'; // Hide CSV button if no data
        this.$('exportBtn').style.display = 'none'; // Hide JSON button if no data
        return;
    }

    this.$('exportCsvBtn').style.display = 'inline-block';
    this.$('exportBtn').style.display = 'inline-block';

    const t = this.langText;

    hist.forEach(h => {
      let div = document.createElement('div');
      div.className = 'card flat history-item';
      div.setAttribute('data-id', h.id); 
      div.style.marginBottom = '0';
      
      const level = getClinicalLevel(h.finalScore, this.lang, this.model);
      
      div.innerHTML = `
        <div class="history-item-content">
          <div onclick="app.loadResultFromHistoryById(${h.id})" style="flex-grow: 1; cursor:pointer;">
            <b>${new Date(h.date).toLocaleDateString(this.lang)}</b>
            <div class="text-muted">${h.user.name || (this.lang === 'ar' ? 'ضيف' : 'Guest')} - ${h.user.age || '--'} ${this.lang === 'ar' ? 'سنة' : 'yrs'}</div>
          </div>
          <div class="history-actions">
            <div class="pill ${getSeverity(h.finalScore, this.model)}">${level}</div>
            <button class="btn secondary export-history-btn" onclick="app.exportSingleResult(${h.id})">${t.exportSingleBtn}</button> 
            <button class="btn secondary print-history-btn" onclick="app.loadResultAndPrint(${h.id})">${t.printHistBtn}</button>
          </div>
        </div>
      `;
      list.appendChild(div);
    });
  }

  // NEW: History Trend Chart Render
  renderHistoryChart(hist) {
    const ctx = this.$('historyTrendChart').getContext('2d');
    if (this.historyChart) this.historyChart.destroy();

    const chartCard = this.$('historyTrendChart').parentNode.parentNode;
    if (hist.length < 2) {
        chartCard.style.display = 'none';
        return;
    }
    chartCard.style.display = 'block';

    // Get unique user name from the first record (assuming we are showing personal history)
    const currentUserName = hist[0].user.name;
    const personalHist = hist.filter(h => h.user.name === currentUserName).sort((a, b) => a.id - b.id);
    
    const dates = personalHist.map(h => new Date(h.date).toLocaleDateString(this.lang));
    const scores = personalHist.map(h => h.finalScore);
    
    // Determine axis color based on current theme
    const axisColor = document.documentElement.getAttribute('data-theme') === 'dark' ? '#94a3b8' : '#64748b';
    const gridColor = document.documentElement.getAttribute('data-theme') === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

    this.historyChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: this.lang === 'ar' ? 'النتيجة الإجمالية %' : 'Overall Score %',
                data: scores,
                borderColor: 'var(--accent-main)',
                backgroundColor: 'rgba(2, 132, 199, 0.2)', // Sky 600 with transparency
                tension: 0.3,
                fill: true,
                pointRadius: 5,
                pointBackgroundColor: 'var(--accent-main)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: this.lang === 'ar' ? 'النتيجة %' : 'Score %',
                        color: axisColor
                    },
                    grid: { color: gridColor },
                    ticks: { color: axisColor }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: axisColor }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: { rtl: this.lang === 'ar' }
            }
        }
    });
  }
  // END NEW: History Trend Chart Render

  loadResultFromHistoryById(id) {
    const hist = safeJsonParse(storage.getItem(this.getHistoryKey()), []);
    const report = hist.find(h => h.id === id);
    if (report) {
      this.renderResult(report);
    } else {
      alert(this.lang === 'ar' ? 'لم يتم العثور على التقرير.' : 'Report not found.');
    }
  }
  
  // --- NATIVE PRINT GENERATION (FIX FOR ARABIC FONT) ---
  loadResultAndPrint(id) {
    const hist = safeJsonParse(storage.getItem(this.getHistoryKey()), []);
    const report = hist.find(h => h.id === id);
    if (report) {
      this.renderResult(report);
      // Wait for re-render before generating PDF
      setTimeout(() => this.createPDFReport(report), 100); 
    } else {
      alert(this.lang === 'ar' ? 'لم يتم العثور على التقرير للطباعة.' : 'Report not found for printing.');
    }
  }

  openPrintView() {
    const section = this.$('result');
    if (!section) { window.print(); return; }

    // Collect styles (including print styles) so the PDF looks identical
    const styles = Array.from(document.querySelectorAll('style')).map(s => s.innerHTML).join('\n');
    const links = Array.from(document.querySelectorAll('link[rel="stylesheet"],link[href*="fonts.googleapis.com"]'))
      .map(l => l.outerHTML).join('\n');

    const dir = (this.lang === 'ar') ? 'rtl' : 'ltr';
    const lang = (this.lang === 'ar') ? 'ar' : 'en';

    const w = window.open('', '_blank');
    if (!w) { window.print(); return; } // Popup blocked
    w.document.open();
    const __printHtml = `<!doctype html>
<html lang="${lang}" dir="${dir}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
${links}
<style>${styles}</style>
</head>
<body class="${document.body.className}">
<div style="max-width: 980px; margin: 0 auto; padding: 16px;">
  ${section.outerHTML}
</div>
<script>
  window.onload = () => { setTimeout(() => { window.print(); }, 250); };
<\/script>
</body>
</html>`;
    w.document.write(escapeScriptEnd(__printHtml));
    w.document.close();
  }


  async createPDFReport(report = this.currentReport) {
    // NOTE: For Arabic (RTL) PDF generation, browser Print-to-PDF is the most reliable
    // option (correct shaping + fonts). We open a clean print view of the report.
    if (!report) return;

    // Ensure result section is visible before printing
    this.showSection('result');
    // Small delay to allow charts/DOM to render
    setTimeout(() => this.openPrintView(), 200);
  }

  exportSingleResult(id) {
      const hist = safeJsonParse(storage.getItem(this.getHistoryKey()), []);
      const item = hist.find(h => h.id === id);

      if (!item) {
          alert(this.lang === 'ar' ? 'لم يتم العثور على التقرير للتصدير.' : 'Report not found for export.');
          return;
      }

      const data = JSON.stringify(item, null, 2);
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      
      a.href = url;
      const name = (item.user.name || 'Guest').replace(/\s/g, '_');
      const date = new Date(item.date).toISOString().slice(0, 10);
      a.download = `Moeen_Report_${name}_${date}.json`;
      
      a.click();
  }
  
  exportAllHistory() {
      const hist = safeJsonParse(storage.getItem(this.getHistoryKey()), []);
      const data = JSON.stringify(hist, null, 2);
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      
      a.href = url;
      a.download = `Moeen_History_Export_${new Date().toISOString().slice(0, 10)}.json`;
      
      a.click();
  }
  
  // NEW: Export History to CSV Function
  exportAllHistoryCSV() {
    const hist = safeJsonParse(storage.getItem(this.getHistoryKey()), []);
    if (hist.length === 0) {
        alert(this.lang === 'ar' ? 'لا يوجد سجلات لتصديرها.' : 'No records to export.');
        return;
    }

    const t = this.langText;
    
    // Define CSV header
    // Collect all unique domain names for the header
    const domainNames = Object.keys(this.model.config.domains).map(d => this.model.config.domains[d][this.lang] + ' (%)');
    const header = [
        this.lang === 'ar' ? 'المعرف' : 'ID',
        this.lang === 'ar' ? 'التاريخ' : 'Date',
        this.lang === 'ar' ? 'الاسم' : 'Name',
        this.lang === 'ar' ? 'العمر' : 'Age',
        this.lang === 'ar' ? 'النوع' : 'Gender',
        this.lang === 'ar' ? 'النتيجة الإجمالية (%)' : 'Overall Score (%)',
        ...domainNames
    ].join(',');
    
    let csv = [header];

    hist.forEach(h => {
        // Map domain results to a row, filling with 0 if domain wasn't tested in that session
        const domainResults = Object.keys(this.model.config.domains).map(d => h.results[d] || 0);

        const row = [
            h.id,
            new Date(h.date).toLocaleDateString('en-CA'), // Use a consistent, non-localized date format
            `"${h.user.name.replace(/"/g, '""')}"`, // Handle quotes in names
            h.user.age,
            h.user.gender,
            h.finalScore,
            ...domainResults
        ].join(',');
        
        csv.push(row);
    });

    const csvString = csv.join('\n');
    
    // Add BOM (\uFEFF) for UTF-8 compatibility in Excel, essential for Arabic
    const blob = new Blob(["\uFEFF" + csvString], { type: 'text/csv;charset=utf-8;' }); 
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    a.href = url;
    a.download = `Moeen_History_Export_${new Date().toISOString().slice(0, 10)}.csv`;
    
    a.click();
  }

  clearAllData() {
    const isAr = this.lang === 'ar';
    const msg = isAr
      ? 'هتمسح كل بيانات البرنامج (المستخدمين + السجل + الإعدادات). متأكد؟'
      : 'This will delete all app data (users + history + settings). Are you sure?';
    if (!confirm(msg)) return;

    // Remove known keys
    Object.values(STORAGE).forEach(k => { try { storage.removeItem(k); } catch(e){} });

    // Remove per-user history keys
    try {
      for (let i = storage.length - 1; i >= 0; i--) {
        const key = storage.key(i);
        if (key && key.startsWith('ps_history_')) storage.removeItem(key);
      }
    } catch(e){}

    // Reload fresh
    location.reload();
  }

  // END NEW: Export History to CSV Function

  // Reset function remains the same
  reset() {
    if(this.$('nameInput')) this.$('nameInput').value = '';
    if(this.$('ageInput')) this.$('ageInput').value = '';
    if(this.$('genderInput')) this.$('genderInput').value = '';
    
    this.answers = {};
    this.currIdx = 0;
    this.qList = [];
    this.currentReport = null;
    
    // Load questionnaire model (can be overridden via Admin JSON)
    this.model = loadModel();
    try { validateModel(this.model); } catch(e) { console.warn(e); this.model = deepClone(DEFAULT_MODEL); }

    
    if(this.chart) {
        this.chart.destroy();
        this.chart = null;
    }
    if(this.historyChart) {
        this.historyChart.destroy();
        this.historyChart = null;
    }

    this.showSection('welcome');
  }
}

// Start App
let app = null;

function showBootError(err) {
  console.error(err);
  const msgAr = 'حصل خطأ منع تشغيل البرنامج. افتح من Chrome وحاول تاني.\n\nتفاصيل: ' + (err?.message || err);
  const msgEn = 'An error prevented the app from starting. Please open in Chrome and try again.\n\nDetails: ' + (err?.message || err);
  const isAr = document.documentElement.lang === 'ar';
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;';
  overlay.innerHTML = `<div style="max-width:720px;width:100%;background:var(--card-bg);border:1px solid var(--card-border);border-radius:16px;padding:18px;color:var(--text);">
    <h3 style="margin:0 0 8px 0;color:var(--bad);font-weight:900;">${isAr ? 'مشكلة تشغيل' : 'Startup Error'}</h3>
    <p style="white-space:pre-wrap;line-height:1.6;color:var(--text);margin:0 0 12px 0;">${isAr ? msgAr : msgEn}</p>
    <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end;">
      <button class="btn secondary" id="copyErrBtn">${isAr ? 'نسخ التفاصيل' : 'Copy details'}</button>
      <button class="btn primary" id="reloadBtn">${isAr ? 'إعادة المحاولة' : 'Reload'}</button>
    </div>
  </div>`;
  document.body.appendChild(overlay);
  overlay.querySelector('#reloadBtn').onclick = () => location.reload();
  overlay.querySelector('#copyErrBtn').onclick = async () => {
    const details = (err?.stack || err?.message || String(err));
    try { await navigator.clipboard.writeText(details); } catch(e){}
    alert(isAr ? 'تم النسخ' : 'Copied');
  };
}

function boot() {
  try {
    app = new MoeenApp();
    window.app = app; // keep global for onclick bindings
  } catch (e) {
    showBootError(e);
  }
}

// Global error surfacing so the app never "freezes silently"
window.addEventListener('error', (e) => {
  if (!app) showBootError(e.error || e.message || e);
});
window.addEventListener('unhandledrejection', (e) => {
  if (!app) showBootError(e.reason || e);
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

</script>

<!-- ===== AI CHAT OPTION (does not change existing UI) ===== -->
<button id="aiChatBtnFloating" aria-label="AI Chat" style="
  position: fixed; left: 18px; bottom: 18px; z-index: 999999;
  background:#0b5cff; color:#fff; border:none; padding:12px 14px;
  border-radius: 999px; cursor:pointer; font-weight:700;
  box-shadow:0 8px 20px rgba(0,0,0,.25);
">
  💬 شات AI
</button>

<div id="aiChatOverlay" style="
  display:none; position: fixed; inset:0; z-index: 1000000;
  background: rgba(0,0,0,.45);
">
  <div style="
    width: min(480px, 94vw); height: min(680px, 88vh);
    background:#0f172a; color:#e5e7eb;
    border-radius:16px; position:absolute; left:18px; bottom:18px;
    display:flex; flex-direction:column; overflow:hidden;
    box-shadow:0 20px 60px rgba(0,0,0,.45);
    border:1px solid rgba(255,255,255,.08);
  ">
    <div style="padding:12px 14px; display:flex; align-items:center; justify-content:space-between; background:#111827;">
      <div style="font-weight:800">Mo’een AI Chat</div>
      <div style="display:flex; gap:8px;">
        <button id="aiChatClear" style="background:#1f2937;color:#fff;border:none;padding:8px 10px;border-radius:10px;cursor:pointer;">مسح</button>
        <button id="aiChatClose" style="background:#ef4444;color:#fff;border:none;padding:8px 10px;border-radius:10px;cursor:pointer;">✕</button>
      </div>
    </div>

    <div id="aiChatBox" style="
      padding:12px; overflow:auto; flex:1; background:#0f172a;
      display:flex; flex-direction:column; gap:10px;
    "></div>

    <form id="aiChatForm" style="display:flex; gap:8px; padding:12px; background:#111827;">
      <input id="aiChatInput" type="text" placeholder="اكتب سؤالك هنا..."
        style="flex:1; padding:10px 12px; border-radius:12px; border:1px solid #374151; background:#0f172a; color:#fff; outline:none;" />
      <button id="aiChatSend" type="submit" style="padding:10px 14px;border-radius:12px;border:none;background:#22c55e;color:#0b1220;font-weight:800;cursor:pointer;">
        إرسال
      </button>
    </form>
  </div>
</div>

<script>
(function(){
  // ✅ حط رابط الـ Backend بتاعك هنا (Railway/Render) بدون "/" في الآخر
  const AI_BASE_URL = "https://moaeen-triage-backend-production.up.railway.app";

  const openBtn = document.getElementById("aiChatBtnFloating");
  const overlay = document.getElementById("aiChatOverlay");
  const closeBtn = document.getElementById("aiChatClose");
  const clearBtn = document.getElementById("aiChatClear");
  const form = document.getElementById("aiChatForm");
  const input = document.getElementById("aiChatInput");
  const box = document.getElementById("aiChatBox");

  function addBubble(text, who){
    const div = document.createElement("div");
    div.style.maxWidth = "85%";
    div.style.padding = "10px 12px";
    div.style.borderRadius = "14px";
    div.style.whiteSpace = "pre-wrap";
    div.style.lineHeight = "1.5";
    div.style.fontSize = "14px";
    div.style.alignSelf = who === "user" ? "flex-end" : "flex-start";
    div.style.background = who === "user" ? "#2563eb" : "#1f2937";
    div.textContent = text;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
  }

  function setOverlay(show){
    overlay.style.display = show ? "block" : "none";
    if(show) setTimeout(()=>input.focus(), 50);
  }

  // Safe bindings (won't break if something missing)
  if(openBtn) openBtn.addEventListener("click", ()=>setOverlay(true));
  if(closeBtn) closeBtn.addEventListener("click", ()=>setOverlay(false));
  if(clearBtn) clearBtn.addEventListener("click", ()=>{ box.innerHTML=""; });

  if(overlay){
    overlay.addEventListener("click", (e)=>{ if(e.target === overlay) setOverlay(false); });
  }

  if(form){
    form.addEventListener("submit", async (e)=>{
      e.preventDefault();
      const text = (input.value || "").trim();
      if(!text) return;

      addBubble(text, "user");
      input.value = "";

      const typing = document.createElement("div");
      typing.style.alignSelf = "flex-start";
      typing.style.background = "#111827";
      typing.style.padding = "10px 12px";
      typing.style.borderRadius = "14px";
      typing.textContent = "…";
      box.appendChild(typing);
      box.scrollTop = box.scrollHeight;

      try{
        // Prefer /api/chat, fallback to /api/triage
        let resp = await fetch(AI_BASE_URL + "/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, lang: "ar" })
        });

        let data = await resp.json().catch(()=> ({}));

        if(!resp.ok || (!data.reply && !data.reply_ar)){
          resp = await fetch(AI_BASE_URL + "/api/triage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, lang: "ar" })
          });
          data = await resp.json().catch(()=> ({}));
        }

        typing.remove();
        const reply = data.reply || data.reply_ar || data.output || data.summary || "حصلت مشكلة في الرد.";
        addBubble(reply, "bot");
      } catch(err){
        typing.remove();
        addBubble("مش قادر أوصل للسيرفر دلوقتي. جرّب تاني.", "bot");
      }
    });
  }

  // Greeting
  addBubble("أهلًا! اكتب سؤالك وهرد عليك.", "bot");
})();


/* =========================================================
   🎙️ Voice Recording + Live Dictation (Browser-native)
   - Recording: MediaRecorder (saves audio blob for playback/download)
   - Dictation: Web Speech API SpeechRecognition (Chrome/Edge; not 100% on all browsers)
   ========================================================= */
(function(){
  const $ = (id)=>document.getElementById(id);

  // ---------- Recording (MediaRecorder) ----------
  let mediaStream = null;
  let recorder = null;
  let chunks = [];

  async function startRecording(){
    try{
      $('voicePlayback').style.display = 'none';
      setVoiceStatus(isArabic() ? 'جاري طلب صلاحية الميكروفون…' : 'Requesting microphone permission…');

      mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunks = [];
      recorder = new MediaRecorder(mediaStream, { mimeType: 'audio/webm' });

      recorder.ondataavailable = (e)=>{ if(e.data && e.data.size) chunks.push(e.data); };
      recorder.onstop = ()=>{
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        $('recAudio').src = url;
        $('recDownload').href = url;
        $('voicePlayback').style.display = 'block';

        // stop mic tracks
        try{ mediaStream.getTracks().forEach(t=>t.stop()); }catch(_){}
        mediaStream = null;

        setVoiceStatus(isArabic() ? 'تم حفظ التسجيل ✅' : 'Recording saved ✅');
      };

      recorder.start();
      toggleRecUI(true);
      setVoiceStatus(isArabic() ? 'جاري التسجيل…' : 'Recording…', true);
    }catch(err){
      console.error(err);
      toggleRecUI(false);
      setVoiceStatus(isArabic()
        ? 'مش قادر أفتح الميكروفون. اتأكد إن الصلاحية مفعّلة في المتصفح.'
        : 'Cannot access microphone. Please enable permission in your browser.'
      );
    }
  }

  function stopRecording(){
    try{
      if(recorder && recorder.state !== 'inactive') recorder.stop();
      toggleRecUI(false);
    }catch(err){
      console.error(err);
      toggleRecUI(false);
    }
  }

  function toggleRecUI(isRec){
    const recBtn = $('recBtn'), recStopBtn = $('recStopBtn');
    if(!recBtn || !recStopBtn) return;
    recBtn.style.display = isRec ? 'none' : 'inline-block';
    recStopBtn.style.display = isRec ? 'inline-block' : 'none';
    recBtn.classList.toggle('micPulse', isRec);
  }

  // ---------- Dictation (SpeechRecognition) ----------
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = null;
  let dictating = false;

  function initRecognition(){
    if(!SR) return null;
    const r = new SR();
    r.continuous = true;
    r.interimResults = true;
    r.lang = isArabic() ? 'ar-EG' : 'en-US';
    return r;
  }

  function startDictation(){
    if(!SR){
      setVoiceStatus(isArabic()
        ? 'الإملاء الصوتي مش مدعوم على المتصفح ده. جرّب Chrome/Edge.'
        : 'Dictation is not supported on this browser. Try Chrome/Edge.'
      );
      return;
    }
    if(dictating) return;

    recognition = initRecognition();
    if(!recognition) return;

    dictating = true;
    toggleDictUI(true);
    setVoiceStatus(isArabic() ? 'اسمعك… اتكلم طبيعي 👂' : 'Listening… speak normally 👂', true);

    const target = $('askInput'); // we write directly into Ask text area
    let finalText = '';

    recognition.onresult = (event)=>{
      let interim = '';
      for(let i = event.resultIndex; i < event.results.length; i++){
        const res = event.results[i];
        const txt = (res[0] && res[0].transcript) ? res[0].transcript : '';
        if(res.isFinal) finalText += txt + ' ';
        else interim += txt;
      }

      // Append to existing user text safely
      const base = target.value.trim();
      const merged = (base ? base + '\n' : '') + finalText.trim() + (interim ? ('\n' + interim) : '');
      target.value = merged.trim();

      // Keep cursor at end
      target.scrollTop = target.scrollHeight;
    };

    recognition.onerror = (e)=>{
      console.error('SpeechRecognition error', e);
      // Some errors are transient; show msg and stop
      stopDictation();
      setVoiceStatus(isArabic()
        ? 'حصلت مشكلة في الإملاء الصوتي. جرّب تاني أو اتأكد من صلاحية الميكروفون.'
        : 'Dictation error. Try again or check microphone permission.'
      );
    };

    recognition.onend = ()=>{
      // If ended unexpectedly while dictating, stop UI
      if(dictating){
        dictating = false;
        toggleDictUI(false);
        setVoiceStatus(isArabic() ? 'تم إيقاف الإملاء.' : 'Dictation stopped.');
      }
    };

    try{ recognition.start(); }catch(e){
      console.error(e);
      dictating = false;
      toggleDictUI(false);
    }
  }

  function stopDictation(){
    dictating = false;
    toggleDictUI(false);
    try{ if(recognition) recognition.stop(); }catch(_){}
    recognition = null;
  }

  function toggleDictUI(isOn){
    const b1 = $('dictateBtn'), b2 = $('dictateStopBtn');
    if(!b1 || !b2) return;
    b1.style.display = isOn ? 'none' : 'inline-block';
    b2.style.display = isOn ? 'inline-block' : 'none';
    b1.classList.toggle('micPulse', isOn);
  }

  // ---------- Helpers ----------
  function isArabic(){
    // If app.lang exists, prefer it; fallback to html lang
    try{
      if(window.app && window.app.lang) return window.app.lang === 'ar';
    }catch(_){}
    return (document.documentElement.lang || 'ar').toLowerCase().startsWith('ar');
  }

  function setVoiceStatus(msg, listening=false){
    const el = $('voiceStatus');
    if(!el) return;
    el.textContent = msg || '';
    el.classList.toggle('listening', !!listening);
  }

  // ---------- Bind UI ----------
  window.addEventListener('DOMContentLoaded', ()=>{
    const recBtn = $('recBtn'), recStopBtn = $('recStopBtn');
    const dBtn = $('dictateBtn'), dStop = $('dictateStopBtn');

    if(recBtn) recBtn.addEventListener('click', startRecording);
    if(recStopBtn) recStopBtn.addEventListener('click', stopRecording);
    if(dBtn) dBtn.addEventListener('click', startDictation);
    if(dStop) dStop.addEventListener('click', stopDictation);

    // Update status text based on language toggle
    setVoiceStatus(isArabic()
      ? 'جاهز. تقدر تسجل أو تعمل إملاء مباشر.'
      : 'Ready. You can record or use live dictation.'
    );
  });

  // Expose minimal hooks (optional)
  window.moeenVoice = { startRecording, stopRecording, startDictation, stopDictation };
})();

</script>
<!-- ===== END AI CHAT OPTION ===== -->

</body>
</html>
