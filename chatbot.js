const chatInput = document.getElementById("chatInput");

async function askAI(message) {
  if (!message) return;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_OPENAI_KEY" // Keep secure in production
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();
    alert("AI says: " + data.choices[0].message.content);

  } catch (err) {
    console.error("AI error:", err);
    alert("AI service unavailable. Try again later.");
  }
}

// Listen for enter
chatInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    askAI(this.value);
    this.value = "";
  }
});
