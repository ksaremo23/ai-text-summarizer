import type { SummaryResponse } from "../types/ai";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

// Debug: Log environment variable status (only in development)
if (import.meta.env.DEV) {
  console.log("Environment check:", {
    hasKey: !!GROQ_API_KEY,
    keyLength: GROQ_API_KEY?.length || 0,
    keyPrefix: GROQ_API_KEY?.substring(0, 7) || "none",
    allEnvKeys: Object.keys(import.meta.env).filter(key => key.startsWith("VITE_"))
  });
}

export async function summarizeText(text: string): Promise<SummaryResponse> {
  if (!GROQ_API_KEY) {
    console.error("VITE_GROQ_API_KEY is not set. Make sure:");
    console.error("1. .env file exists in the project root");
    console.error("2. .env contains: VITE_GROQ_API_KEY=your_key_here");
    console.error("3. Dev server was restarted after creating/updating .env");
    console.error("4. .env file has no extra spaces or quotes around the value");
    return {
      summary: "",
      error: "API key not configured. Please set VITE_GROQ_API_KEY in your .env file and restart the dev server.",
    };
  }

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant", // Fast and efficient model for summarization
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that provides concise and accurate summaries of text. Summarize the given text in a clear and informative way.",
          },
          {
            role: "user",
            content: `Please summarize the following text:\n\n${text}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || `API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    const summary = data.choices[0]?.message?.content || "No summary generated.";

    return { summary };
  } catch (error) {
    return {
      summary: "",
      error:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while summarizing the text.",
    };
  }
}

