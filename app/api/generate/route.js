import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: "Missing 'prompt' in request body." }),
        { status: 400 }
      );
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful AI assistant." },
        { role: "user", content: prompt },
      ],
    });

    const result = completion.choices[0].message.content;
    return new Response(JSON.stringify({ result }), { status: 200 });
  } catch (error) {
    console.error("Error in /api/generate:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Server error" }),
      { status: 500 }
    );
  }
}
