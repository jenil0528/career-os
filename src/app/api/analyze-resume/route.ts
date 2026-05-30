import { NextRequest, NextResponse } from "next/server";
import { DEMO_RESUME_ANALYSIS } from "@/lib/demo-data";
import { RESUME_ANALYSIS_PROMPT } from "@/lib/prompts";
import { getAIClient, parseAIResponse } from "@/lib/ai-client";

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
    const githubUrl = formData.get("githubUrl") as string | null;

    if (!file && (!githubUrl || githubUrl.trim() === "")) {
      return NextResponse.json(
        { error: "Please provide a resume PDF or a GitHub URL" },
        { status: 400 }
      );
    }

    let resumeText = "";
    let githubData: any = null;

    // 1. Process PDF if provided
    if (file && file.size > 0) {
      if (!ALLOWED_TYPES.includes(file.type) && !file.name.toLowerCase().endsWith(".pdf")) {
        return NextResponse.json({ error: "Please upload a PDF file" }, { status: 400 });
      }
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: "File size exceeds 10MB limit" }, { status: 400 });
      }

      const fileBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(fileBuffer);
      let fileText = "";
      try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { PDFParse } = require("pdf-parse");
        const pdf = new PDFParse({ data: buffer });
        const pdfData = await pdf.getText();
        fileText = pdfData.text;
      } catch (e) {
        console.error("PDF parse error:", e);
      }
      const cleanedText = fileText.replace(/[^\x20-\x7E\n\r\t]/g, " ").replace(/\s+/g, " ").trim();
      resumeText += cleanedText.length > 100 ? cleanedText.slice(0, 8000) : "Unable to extract meaningful text from this PDF. ";
    }

    // 2. Process GitHub URL if provided
    if (githubUrl && githubUrl.trim() !== "") {
      try {
        const username = githubUrl.trim().replace(/\/$/, "").split("/").pop();
        if (username) {
          const userRes = await fetch(`https://api.github.com/users/${username}`, {
            headers: { "User-Agent": "CareerOS-App" }
          });
          const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`, {
            headers: { "User-Agent": "CareerOS-App" }
          });
          
          if (userRes.ok && reposRes.ok) {
            const userData = await userRes.json();
            const reposData = await reposRes.json();
            githubData = { user: userData, repos: reposData };
            resumeText += `\n\n=== GITHUB PROFILE ===\nUsername: ${userData.login}\nBio: ${userData.bio}\nPublic Repos: ${userData.public_repos}\nFollowers: ${userData.followers}\nRecent Repositories:\n`;
            reposData.forEach((repo: any) => {
              resumeText += `- ${repo.name}: ${repo.description || "No description"} (Language: ${repo.language})\n`;
            });
          } else {
            resumeText += "\n\n(Could not fetch detailed GitHub data, but candidate provided link: " + githubUrl + ")";
          }
        }
      } catch (err) {
        console.error("GitHub fetch error:", err);
      }
    }

    const { openai, model: aiModel, apiKey } = await getAIClient(request);

    if (!openai || !apiKey) {
      return NextResponse.json(
        { error: "No API key configured. Please add an OpenAI or Gemini API key in settings." },
        { status: 401 }
      );
    }

    let responseText;
    try {
      const completion = await openai.chat.completions.create({
        model: aiModel as string,
        messages: [
          {
            role: "system",
            content: "You are an expert resume analyzer. Always respond with valid JSON only, no markdown formatting.",
          },
          {
            role: "user",
            content: RESUME_ANALYSIS_PROMPT + "\n\nCANDIDATE DATA:\n" + resumeText,
          },
        ],
        temperature: 0.7,
        max_tokens: 3000,
        response_format: { type: "json_object" },
      });
      responseText = completion.choices[0]?.message?.content;
    } catch (apiError: any) {
      console.error("OpenAI API error:", apiError);
      return NextResponse.json(
        { error: `AI processing failed: ${apiError.message || "Unknown error"}` },
        { status: 500 }
      );
    }
    if (!responseText) {
      return NextResponse.json({ error: "No response from AI" }, { status: 500 });
    }

    let analysis;
    try {
      analysis = parseAIResponse(responseText);
    } catch (e) {
      console.error("Failed to parse resume JSON:", responseText);
      return NextResponse.json(
        { error: "AI returned invalid format. Please try again." },
        { status: 500 }
      );
    }
    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Resume analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze resume. Please try again." },
      { status: 500 }
    );
  }
}
