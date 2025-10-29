export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  if (!prompt || prompt.trim().length === 0) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  // Dummy AI response for now (you can connect to an API later)
  const fakeOutput = `AI Response: I’d build something amazing based on "${prompt}".`;

  res.status(200).json({ output: fakeOutput });
}
