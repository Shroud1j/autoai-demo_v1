import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt || prompt.trim() === "") {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Call OpenAI API
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
              "You are an AI that generates complete front-end code (HTML, CSS, JS or React) based on the user's prompt.",
          },
          { role: "user", content: prompt },
        ],
      }),
    });

    // If the OpenAI API fails
    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenAI API error:", errText);
      return NextResponse.json(
        { error: "OpenAI API request failed", details: errText },
        { status: 500 }
      );
    }

    // Get valid JSON response
    const data = await response.json();
    const output = data.choices?.[0]?.message?.content || "No output generated.";

    // Return JSON response
    return NextResponse.json({ output });
  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json(
      { error: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
}


