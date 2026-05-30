import { NextRequest } from "next/server";

export async function getAIClient(request: NextRequest) {
  // 1. Get user key from headers, fallback to environment variable
  const userKey = request.headers.get("x-user-api-key");
  const apiKey = userKey && userKey.trim() !== "" ? userKey.trim() : process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return { openai: null, model: null, apiKey: null };
  }

  const OpenAI = (await import("openai")).default;
  
  let openaiConfig: any = { apiKey };
  let model = "gemini-2.5-flash"; // Default

  // 2. Smart Model Routing
  if (apiKey.startsWith("AIza") || apiKey.startsWith("AQ.")) {
    // It's a Google Gemini Key
    openaiConfig.baseURL = "https://generativelanguage.googleapis.com/v1beta/openai/";
    model = "gemini-2.5-flash";
  } else if (apiKey.startsWith("sk-") || apiKey.startsWith("proj-")) {
    // It's an OpenAI Key
    model = "gpt-4o-mini";
  } else if (apiKey.startsWith("nvapi-")) {
    // It's an NVIDIA NIM Key
    openaiConfig.baseURL = "https://integrate.api.nvidia.com/v1";
    model = "meta/llama-3.1-70b-instruct"; // or another free model available on NVIDIA NIM
  } else {
    // Fallback: Assume the system environment variable is configured for Gemini via OpenAI proxy
    openaiConfig.baseURL = "https://generativelanguage.googleapis.com/v1beta/openai/";
  }

  const openai = new OpenAI(openaiConfig);

  return { openai, model, apiKey };
}

/**
 * A robust JSON parser for AI responses.
 * It removes markdown code blocks and attempts to extract the JSON object/array from surrounding text.
 */
export function parseAIResponse(text: string): any {
  if (!text) throw new Error("Empty AI response");

  let cleanText = text.trim();

  // 1. Remove markdown code blocks
  if (cleanText.includes("```")) {
    const match = cleanText.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    if (match && match[1]) {
      cleanText = match[1].trim();
    } else {
      // Fallback: just strip the backticks
      cleanText = cleanText.replace(/```json/gi, "").replace(/```/g, "").trim();
    }
  }

  // 2. Try to find the first { or [ and last } or ]
  const firstCurly = cleanText.indexOf('{');
  const firstSquare = cleanText.indexOf('[');
  const lastCurly = cleanText.lastIndexOf('}');
  const lastSquare = cleanText.lastIndexOf(']');

  let startIndex = -1;
  let endIndex = -1;

  if (firstCurly !== -1 && (firstSquare === -1 || firstCurly < firstSquare)) {
    startIndex = firstCurly;
    endIndex = lastCurly;
  } else if (firstSquare !== -1) {
    startIndex = firstSquare;
    endIndex = lastSquare;
  }

  if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
    cleanText = cleanText.substring(startIndex, endIndex + 1);
  }

  try {
    return JSON.parse(cleanText);
  } catch (error) {
    console.error("Failed to parse cleaned AI response:", cleanText);
    throw new Error("Invalid JSON format from AI");
  }
}
