import { useState } from "react";
import { TextInput } from "./TextInput";
import { PromptControls } from "./PromptControls";
import { SummaryOutput } from "./SummaryOutput";
import { summarizeText } from "../../services/aiService";

export function Summarizer() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [length, setLength] = useState<"short" | "medium" | "long">("medium");
  const [tone, setTone] = useState<"neutral" | "simple" | "professional">("neutral");
  const [bullets, setBullets] = useState(false);

  const handleSummarize = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setError(null);
    setSummary("");

    try {
      const result = await summarizeText(text, { length, tone, bullets });
      if (result.error) {
        setError(result.error);
      } else {
        setSummary(result.summary);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="summarizer-container">
      <div className="section-header">
        <h2>Text Summarizer</h2>
        <p>Paste your text and customize the summary output</p>
      </div>

      <PromptControls
        length={length}
        tone={tone}
        bullets={bullets}
        onLengthChange={setLength}
        onToneChange={setTone}
        onBulletsChange={setBullets}
        disabled={loading}
      />

      <TextInput
        value={text}
        onChange={setText}
        onSubmit={handleSummarize}
        loading={loading}
        disabled={loading}
      />

      <SummaryOutput summary={summary} error={error} loading={loading} />
    </div>
  );
}

