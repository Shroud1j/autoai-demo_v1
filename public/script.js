const button = document.getElementById("generate");
const output = document.getElementById("output");

button.addEventListener("click", async () => {
  const prompt = document.getElementById("prompt").value.trim();
  output.textContent = "⏳ Generating code...";

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
      const err = await res.text();
      output.textContent = `❌ Server Error: ${err}`;
      return;
    }

    const data = await res.json();
    output.textContent = data.output || "⚠️ No response.";
  } catch (e) {
    output.textContent = `💥 Fetch failed: ${e.message}`;
  }
});
