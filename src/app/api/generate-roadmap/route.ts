import { NextRequest, NextResponse } from "next/server";
import { DEMO_ROADMAP } from "@/lib/demo-data";
import { ROADMAP_PROMPT } from "@/lib/prompts";
import { getAIClient } from "@/lib/ai-client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { role } = body;

    if (!role || typeof role !== "string") {
      return NextResponse.json(
        { error: "Please provide a role" },
        { status: 400 }
      );
    }

    // Sanitize role input — max 100 chars, alphanumeric + spaces only
    const sanitizedRole = role.trim().slice(0, 100).replace(/[^a-zA-Z0-9\s-]/g, "");
    if (!sanitizedRole) {
      return NextResponse.json(
        { error: "Invalid role name" },
        { status: 400 }
      );
    }

    const { openai, model: aiModel, apiKey } = await getAIClient(request);

    if (!openai || !apiKey) {
      // Demo mode: return demo roadmap with the selected role name
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return NextResponse.json({
        ...DEMO_ROADMAP,
        role: sanitizedRole,
      });
    }

    // Real mode with OpenAI
    const prompt = ROADMAP_PROMPT.replace(/\{role\}/g, sanitizedRole);

    const completion = await openai.chat.completions.create({
      model: aiModel as string,
      messages: [
        {
          role: "system",
          content:
            "You are a career counselor. Always respond with valid JSON only, no markdown formatting.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 8192,
      response_format: { type: "json_object" },
    });

    const responseText = completion.choices[0]?.message?.content;
    if (!responseText) {
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 }
      );
    }

    // Clean the response text to remove any markdown formatting (e.g. ```json ... ```)
    let cleanText = responseText;
    if (cleanText.startsWith("```json")) {
      cleanText = cleanText.substring(7);
    } else if (cleanText.startsWith("```")) {
      cleanText = cleanText.substring(3);
    }
    if (cleanText.endsWith("```")) {
      cleanText = cleanText.substring(0, cleanText.length - 3);
    }
    cleanText = cleanText.trim();

    const roadmap = JSON.parse(cleanText);
    return NextResponse.json(roadmap);
  } catch (error) {
    console.error("Roadmap generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate roadmap. Please try again." },
      { status: 500 }
    );
  }
}
