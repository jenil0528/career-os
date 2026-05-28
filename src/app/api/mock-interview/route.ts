import { NextRequest, NextResponse } from "next/server";
import { DEMO_INTERVIEW_QUESTIONS } from "@/lib/demo-data";
import {
  INTERVIEW_SYSTEM_PROMPT,
  INTERVIEW_ANALYSIS_PROMPT,
} from "@/lib/prompts";
import type { InterviewMode, AnswerAnalysis } from "@/types";

interface InterviewRequestBody {
  mode: InterviewMode;
  messages: { role: "ai" | "user"; content: string }[];
  currentQuestion?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: InterviewRequestBody = await request.json();
    const { mode, messages, currentQuestion } = body;

    if (!mode || !["hr", "technical", "startup", "product", "sales", "marketing"].includes(mode)) {
      return NextResponse.json(
        { error: "Invalid interview mode" },
        { status: 400 }
      );
    }

    // Validate message array
    if (messages && (!Array.isArray(messages) || messages.length > 50)) {
      return NextResponse.json(
        { error: "Invalid or too many messages" },
        { status: 400 }
      );
    }

    // Validate individual message lengths
    if (
      messages?.some(
        (m: { content?: string }) =>
          typeof m.content !== "string" || m.content.length > 5000
      )
    ) {
      return NextResponse.json(
        { error: "Message content too long (max 5000 chars)" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      // Demo mode
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const questions =
        DEMO_INTERVIEW_QUESTIONS[mode as keyof typeof DEMO_INTERVIEW_QUESTIONS];
      const questionIndex = Math.floor(messages.filter((m) => m.role === "ai").length);

      let analysis: AnswerAnalysis | undefined;

      // Generate mock analysis for the user's last answer
      if (messages.length > 0 && messages[messages.length - 1].role === "user") {
        const userAnswer = messages[messages.length - 1].content;
        const wordCount = userAnswer.split(" ").length;

        analysis = {
          confidenceScore: Math.min(95, Math.max(40, 60 + wordCount * 2)),
          communicationScore: Math.min(95, Math.max(45, 55 + wordCount * 3)),
          technicalScore: Math.min(90, Math.max(35, 50 + wordCount)),
          fillerWords: wordCount < 10 ? ["um", "like"] : [],
          feedback:
            wordCount > 20
              ? "Good detailed response! You provided specific examples and structured your answer well. Consider being slightly more concise while keeping the key details."
              : "Your answer was a bit brief. Try to elaborate more with specific examples from your experience. Use the STAR method (Situation, Task, Action, Result) for behavioral questions.",
        };
      }

      if (questionIndex >= questions.length) {
        return NextResponse.json({
          question: null,
          analysis,
          isComplete: true,
        });
      }

      return NextResponse.json({
        question: questions[questionIndex],
        analysis,
        isComplete: false,
      });
    }

    // Real mode with OpenAI
    const OpenAI = (await import("openai")).default;
    const openai = new OpenAI({ 
      apiKey,
      baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
    });

    let analysis: AnswerAnalysis | undefined;

    // Analyze the user's last answer if there is one
    if (
      currentQuestion &&
      messages.length > 0 &&
      messages[messages.length - 1].role === "user"
    ) {
      const userAnswer = messages[messages.length - 1].content;
      const analysisPrompt = INTERVIEW_ANALYSIS_PROMPT.replace(
        "{question}",
        currentQuestion
      ).replace("{answer}", userAnswer);

      const analysisCompletion = await openai.chat.completions.create({
        model: "gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content:
              "You are an interview coach. Respond with valid JSON only.",
          },
          { role: "user", content: analysisPrompt },
        ],
        temperature: 0.7,
        max_tokens: 500,
        response_format: { type: "json_object" },
      });

      const analysisText = analysisCompletion.choices[0]?.message?.content;
      if (analysisText) {
        try {
          analysis = JSON.parse(analysisText);
        } catch {
          // AI returned invalid JSON — skip analysis
        }
      }
    }

    // Generate next question
    const systemPrompt =
      INTERVIEW_SYSTEM_PROMPT[mode as keyof typeof INTERVIEW_SYSTEM_PROMPT];

    const openaiMessages: { role: "system" | "user" | "assistant"; content: string }[] = [
      { role: "system", content: systemPrompt },
    ];

    for (const msg of messages) {
      openaiMessages.push({
        role: msg.role === "ai" ? "assistant" : "user",
        content: msg.content,
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: openaiMessages,
      temperature: 0.8,
      max_tokens: 500,
    });

    const question = completion.choices[0]?.message?.content || null;

    return NextResponse.json({
      question,
      analysis,
      isComplete: !question,
    });
  } catch (error) {
    console.error("Interview API error:", error);
    return NextResponse.json(
      { error: "Failed to process interview request" },
      { status: 500 }
    );
  }
}
