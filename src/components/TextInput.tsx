import { useState } from "react";

type Props = {
  onSubmit: (text: string) => void;
  loading: boolean;
};

export function TextInput({ onSubmit, loading }: Props) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text);
    }
  };

  return (
    <div className="text-input-container">
      <textarea
        className="text-input"
        placeholder="Paste text here to summarize..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        disabled={loading}
      />
      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={loading || !text.trim()}
      >
        {loading ? "Summarizing..." : "Summarize"}
      </button>
    </div>
  );
}

