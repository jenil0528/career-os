import { NextRequest, NextResponse } from "next/server";
import { DEMO_JOB_MATCH_RESULT } from "@/lib/demo-data";
import { JOB_MATCH_PROMPT } from "@/lib/prompts";
import { getAIClient } from "@/lib/ai-client";

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

    const { openai, model: aiModel, apiKey } = await getAIClient(request);

    if (!openai || !apiKey) {
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

    // Fetch real active jobs to feed to the AI
    let realJobsContext = "";
    try {
      const remotiveRes = await fetch("https://remotive.com/api/remote-jobs?category=software-dev&limit=50", {
        cache: "no-store" // Always fetch the freshest, newly arrived jobs
      });
      if (remotiveRes.ok) {
        const data = await remotiveRes.json();
        if (data && data.jobs) {
          const simplifiedJobs = data.jobs.map((j: any) => ({
            title: j.title,
            company: j.company_name,
            url: j.url,
            salary: j.salary || "Competitive",
            workMode: j.job_type === "full_time" ? "Remote (Full Time)" : "Remote",
          }));
          realJobsContext = `\n\n=== REAL ACTIVE JOBS ON THE MARKET ===\n${JSON.stringify(simplifiedJobs)}\n\nCRITICAL INSTRUCTION: You MUST select the 7 best matches exclusively from the "REAL ACTIVE JOBS ON THE MARKET" list above. Do NOT invent fake companies or roles. For each matched job, use its exact 'title' for the role, its exact 'company', and you MUST include a 'url' field in the JSON with the exact URL provided in the list. Use its salary and workMode as well.`;
        }
      }
    } catch (err) {
      console.error("Failed to fetch real jobs for AI context", err);
    }

    const finalPrompt = JOB_MATCH_PROMPT + realJobsContext + "\n\nResume text:\n" + resumeText;

    const completion = await openai.chat.completions.create({
      model: aiModel as string,
      messages: [
        {
          role: "system",
          content:
            "You are an expert career advisor and technical recruiter. Always respond with valid JSON only, no markdown formatting.",
        },
        {
          role: "user",
          content: finalPrompt,
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
