import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    // safety check
    if (!prompt || prompt.trim() === "") {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // use OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an AI that generates full front-end app code (HTML, CSS, JS or React) based on user instructions.",
          },
          { role: "user", content: prompt },
        ],
      }),
    });

    // check if OpenAI failed
    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API error:", errorText);
      return NextResponse.json(
        { error: "OpenAI API request failed", details: errorText },
        { status: 500 }
      );
    }

    const data = await response.json();
    const output = data.choices?.[0]?.message?.content || "No output generated.";

    return NextResponse.json({ output });
  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json(
      { error: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
}

