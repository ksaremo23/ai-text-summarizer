const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export type AIMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type AIResponse = {
  content: string;
  error?: string;
};

// Debug: Log environment variable status (only in development)
if (import.meta.env.DEV) {
  console.log("Environment check:", {
    hasKey: !!GROQ_API_KEY,
    keyLength: GROQ_API_KEY?.length || 0,
    keyPrefix: GROQ_API_KEY?.substring(0, 7) || "none",
    allEnvKeys: Object.keys(import.meta.env).filter(key => key.startsWith("VITE_"))
  });
}

/**
 * Reusable AI service function for both summarization and chat
 * @param messages - Array of messages (system, user, assistant)
 * @param options - Optional configuration (model, temperature, max_tokens)
 * @returns AI response with content or error
 */
export async function callAI(
  messages: AIMessage[],
  options?: {
    model?: string;
    temperature?: number;
    max_tokens?: number;
  }
): Promise<AIResponse> {
  if (!GROQ_API_KEY) {
    console.error("VITE_GROQ_API_KEY is not set. Make sure:");
    console.error("1. .env file exists in the project root");
    console.error("2. .env contains: VITE_GROQ_API_KEY=your_key_here");
    console.error("3. Dev server was restarted after creating/updating .env");
    console.error("4. .env file has no extra spaces or quotes around the value");
    return {
      content: "",
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
        model: options?.model || "llama-3.1-8b-instant",
        messages,
        temperature: options?.temperature ?? 0.7,
        max_tokens: options?.max_tokens ?? 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || `API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || "No response generated.";

    return { content };
  } catch (error) {
    return {
      content: "",
      error:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while processing the request.",
    };
  }
}

/**
 * Legacy function for backward compatibility - wraps callAI for summarization
 */
export async function summarizeText(
  text: string,
  options?: {
    length?: "short" | "medium" | "long";
    tone?: "neutral" | "simple" | "professional";
    bullets?: boolean;
  }
): Promise<{ summary: string; error?: string }> {
  const lengthMap = {
    short: "2-3 sentences",
    medium: "a paragraph",
    long: "multiple paragraphs",
  };

  const toneMap = {
    neutral: "neutral and objective",
    simple: "simple and easy to understand",
    professional: "professional and formal",
  };

  const format = options?.bullets ? "Use bullet points." : "Use paragraph format.";

  const systemPrompt = `You are a helpful assistant that provides concise and accurate summaries of text. 
Summarize the given text in a ${toneMap[options?.tone || "neutral"]} tone.
Length: ${lengthMap[options?.length || "medium"]}.
${format}`;

  const messages: AIMessage[] = [
    {
      role: "system",
      content: systemPrompt,
    },
    {
      role: "user",
      content: `Please summarize the following text:\n\n${text}`,
    },
  ];

  const result = await callAI(messages, {
    max_tokens: options?.length === "long" ? 800 : options?.length === "short" ? 200 : 500,
  });

  return {
    summary: result.content,
    error: result.error,
  };
}

