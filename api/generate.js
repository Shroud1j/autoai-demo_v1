export default async function handler(req, res) {
  const { prompt } = req.body;

  // Connect to OpenAI
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful AI that generates code or ideas for building apps." },
        { role: "user", content: prompt }
      ]
    })
  });

  const data = await response.json();
  res.status(200).json({ output: data.choices?.[0]?.message?.content || "No output." });
}
