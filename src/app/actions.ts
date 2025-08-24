"use server";

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";

type AnalysisResult = {
  wordCount: number;
  charCount: number;
  sentiment: string;
  topics: string;
  summary: string;
  timestamp: string;
};

// Initialize the Gemini model with your subscription[48]
const model = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash", // Latest model
  apiKey: process.env.GEMINI_API_KEY!,
  temperature: 0.3,
});

// LangChain prompt template for structured analysis[4][5]
const analysisTemplate = `You are an expert text analyst. Analyze the following text and provide detailed insights.

Text to analyze: "{inputText}"

Please provide your analysis in the following JSON format (respond with valid JSON only):
{{
  "sentiment": "Positive/Negative/Neutral",
  "topics": "comma-separated list of 2-3 main topics",
  "summary": "concise summary in 1-2 sentences, max 120 characters"
}}

Important: Respond with valid JSON only, no additional text.`;

const prompt = PromptTemplate.fromTemplate(analysisTemplate);

export async function analyzeTextAction(
  inputText: string
): Promise<AnalysisResult> {
  // Validation
  console.log("GEMINI_API_KEY", process.env.GEMINI_API_KEY);
  console.log("inputText", inputText);
  console.log("model", model);
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY not found in environment variables");
  }

  const text = (inputText ?? "").trim();
  if (!text) {
    throw new Error("Text is required");
  }
  if (text.length > 5000) {
    throw new Error("Text too long (max 5000 characters)");
  }

  // Basic text processing using your JavaScript skills[21]
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const charCount = text.length;

  try {
    // Create LangChain pipeline[4][5]
    const chain = prompt.pipe(model);
    const aiResult = await chain.invoke({ inputText: text });

    // Parse AI response
    let sentiment = "Unknown";
    let topics = "";
    let summary = "";

    try {
      // Clean the response in case it has markdown formatting
      const cleanedResponse = String(aiResult.content)
        .replace(/```json\s*/g, "")
        .replace(/```\s*/g, "")
        .trim();

      const parsed = JSON.parse(cleanedResponse);
      sentiment = parsed.sentiment ?? sentiment;
      topics = parsed.topics ?? topics;
      summary = parsed.summary ?? summary;
    } catch (parseError) {
      console.error("JSON parsing failed:", parseError);
      // Fallback: use raw content as summary
      summary = String(aiResult.content).slice(0, 120);
    }

    const result: AnalysisResult = {
      wordCount,
      charCount,
      sentiment,
      topics,
      summary,
      timestamp: new Date().toISOString(),
    };

    // Optional: Send to n8n webhook (fire-and-forget)[17]
    if (process.env.N8N_WEBHOOK_URL) {
      fetch(process.env.N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalText: text,
          analysis: result,
          source: "ai-text-analyzer",
          timestamp: new Date().toISOString(),
        }),
      }).catch((error) => {
        console.error("Webhook failed:", error);
        // Don't throw - webhook failure shouldn't break user experience
      });
    }

    return result;
  } catch (error) {
    console.error("Analysis error:", error);
    throw new Error("Failed to analyze text. Please try again.");
  }
}
