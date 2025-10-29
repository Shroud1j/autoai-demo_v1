import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: "Missing prompt" }), { status: 400 });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful AI that generates code or ideas for app development." },
        { role: "user", content: prompt }
      ]
    });

    const output = completion.choices[0].message.content;
    return new Response(JSON.stringify({ output }), { status: 200 });
  } catch (err) {
    console.error("Error in /api/generate:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
