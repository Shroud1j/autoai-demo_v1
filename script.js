document.getElementById("generateBtn").addEventListener("click", async () => {
  const prompt = document.getElementById("promptInput").value.trim();
  const outputBox = document.getElementById("output");
  outputBox.textContent = "Generating...";

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    outputBox.textContent = data.output || data.error || "No output.";
  } catch (err) {
    outputBox.textContent = "Error: " + err.message;
  }
});
