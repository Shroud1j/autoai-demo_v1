async function generateCode() {
  const prompt = document.getElementById("prompt").value;
  const outputDiv = document.getElementById("output");
  outputDiv.innerText = "Generating...";

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();

    if (data.error) {
      outputDiv.innerText = `Error: ${data.error}`;
    } else {
      outputDiv.innerText = data.result;
    }
  } catch (err) {
    outputDiv.innerText = `Error: ${err.message}`;
  }
}
