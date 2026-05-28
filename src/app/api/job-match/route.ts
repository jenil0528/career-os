import { NextRequest, NextResponse } from "next/server";
import { DEMO_JOB_MATCH_RESULT } from "@/lib/demo-data";
import { JOB_MATCH_PROMPT } from "@/lib/prompts";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ["application/pdf"];

export async function POST(request: NextRequest) {
  try {
    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      return NextResponse.json(
        { error: "Invalid form data" },
        { status: 400 }
      );
    }

    const file = formData.get("resume") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No resume file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    if (
      !ALLOWED_TYPES.includes(file.type) &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      return NextResponse.json(
        { error: "Please upload a PDF file" },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds 10MB limit" },
        { status: 400 }
      );
    }

    if (file.size === 0) {
      return NextResponse.json(
        { error: "Uploaded file is empty" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      // Demo mode: simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 2500));
      return NextResponse.json(DEMO_JOB_MATCH_RESULT);
    }

    // Real mode: Extract text from the uploaded file
    const fileBuffer = await file.arrayBuffer();
    const fileText = new TextDecoder("utf-8").decode(fileBuffer);

    // Use a cleaned version of the text (remove non-printable chars)
    const cleanedText = fileText
      .replace(/[^\x20-\x7E\n\r\t]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const resumeText =
      cleanedText.length > 100
        ? cleanedText.slice(0, 8000)
        : "Unable to extract meaningful text from this PDF. Please analyze based on a typical software engineer resume.";

    const OpenAI = (await import("openai")).default;
    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are an expert career advisor and technical recruiter. Always respond with valid JSON only, no markdown formatting.",
        },
        {
          role: "user",
          content: JOB_MATCH_PROMPT + resumeText,
        },
      ],
      temperature: 0.7,
      max_tokens: 5000,
      response_format: { type: "json_object" },
    });

    const responseText = completion.choices[0]?.message?.content;
    if (!responseText) {
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 }
      );
    }

    let analysis;
    try {
      analysis = JSON.parse(responseText);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 500 }
      );
    }

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Job match analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze resume for job matching. Please try again." },
      { status: 500 }
    );
  }
}
