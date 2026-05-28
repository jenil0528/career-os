import { NextRequest, NextResponse } from "next/server";
import { DEMO_RESUME_ANALYSIS } from "@/lib/demo-data";
import { RESUME_ANALYSIS_PROMPT } from "@/lib/prompts";

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

    // 1. Process PDF if provided
    if (file && file.size > 0) {
      if (!ALLOWED_TYPES.includes(file.type) && !file.name.toLowerCase().endsWith(".pdf")) {
        return NextResponse.json({ error: "Please upload a PDF file" }, { status: 400 });
      }
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: "File size exceeds 10MB limit" }, { status: 400 });
      }

      const fileBuffer = await file.arrayBuffer();
      const fileText = new TextDecoder("utf-8").decode(fileBuffer);
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

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return NextResponse.json(DEMO_RESUME_ANALYSIS);
    }

    const OpenAI = (await import("openai")).default;
    const openai = new OpenAI({ 
      apiKey,
      baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
    });

    const completion = await openai.chat.completions.create({
      model: "gemini-2.5-flash",
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

    const responseText = completion.choices[0]?.message?.content;
    if (!responseText) {
      return NextResponse.json({ error: "No response from AI" }, { status: 500 });
    }

    let analysis;
    try {
      analysis = JSON.parse(responseText);
    } catch {
      return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
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
