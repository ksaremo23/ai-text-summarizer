import { useState } from "react";
import { summarizeText } from "../services/aiService";

export function useAISummary() {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generateSummary(text: string) {
    setLoading(true);
    setError(null);
    setSummary("");
    
    try {
      const result = await summarizeText(text);
      if (result.error) {
        setError(result.error);
      } else {
        setSummary(result.summary);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  }

  return { summary, loading, error, generateSummary };
}

