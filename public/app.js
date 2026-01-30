const chatEl = document.getElementById("chat");
const inputEl = document.getElementById("input");
const sendBtn = document.getElementById("send");
const newChatBtn = document.getElementById("newChat");
const modeEl = document.getElementById("mode");

let sessionId = localStorage.getItem("moaeen_session") || null;

function addMessage(text, who = "bot", meta = null) {
  const div = document.createElement("div");
  div.className = `msg ${who}`;

  if (meta?.triage?.level) {
    const level = meta.triage.level;
    const badge = document.createElement("div");
    badge.className = `badge ${level}`;
    badge.textContent =
      level === "red" ? "🔴 خطر" : level === "yellow" ? "🟡 متابعة" : "🟢 مطمّن";
    div.appendChild(badge);
  }

  div.appendChild(document.createTextNode(text));
  chatEl.appendChild(div);
  chatEl.scrollTop = chatEl.scrollHeight;
}

function setBusy(busy) {
  sendBtn.disabled = busy;
  inputEl.disabled = busy;
  sendBtn.textContent = busy ? "..." : "إرسال";
}

async function send() {
  const message = inputEl.value.trim();
  if (!message) return;

  addMessage(message, "user");
  inputEl.value = "";
  setBusy(true);

  try {
    const resp = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        sessionId,
        mode: modeEl.value
      }),
    });

    const data = await resp.json();

    if (!resp.ok) {
      addMessage(`خطأ: ${data?.error || "Unknown"}\n${data?.detail || ""}`, "bot");
      setBusy(false);
      return;
    }

    if (!sessionId && data.sessionId) {
      sessionId = data.sessionId;
      localStorage.setItem("moaeen_session", sessionId);
    }

    const ar = data.reply_ar || "";
    const en = data.reply_en || "";
    const finalText = `${ar}\n\n—\n\n${en}`.trim();

    addMessage(finalText, "bot", data);

    // لو في أسئلة متابعة (Triage)
    const qAr = data?.triage?.next_questions_ar || [];
    const qEn = data?.triage?.next_questions_en || [];
    if (qAr.length || qEn.length) {
      addMessage(
        `أسئلة متابعة:\n- ${qAr.join("\n- ")}\n\nFollow-up:\n- ${qEn.join("\n- ")}`,
        "bot"
      );
    }

  } catch (e) {
    addMessage(`Network error: ${e?.message || e}`, "bot");
  } finally {
    setBusy(false);
    inputEl.focus();
  }
}

sendBtn.addEventListener("click", send);
inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    send();
  }
});

newChatBtn.addEventListener("click", () => {
  sessionId = null;
  localStorage.removeItem("moaeen_session");
  chatEl.innerHTML = "";
  addMessage("ابدأ محادثة جديدة. اكتب مشكلتك…", "bot");
});

addMessage("أهلاً! اكتب المشكلة أو السؤال، وهرد عليك عربي + إنجليزي.", "bot");
