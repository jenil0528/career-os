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
