import { useState, KeyboardEvent } from "react";
import { Button } from "../UI/Button";

type ChatInputProps = {
  onSend: (message: string) => void;
  loading: boolean;
  disabled?: boolean;
};

export function ChatInput({ onSend, loading, disabled = false }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() && !loading && !disabled) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-input-container">
      <input
        type="text"
        className="chat-input"
        placeholder="Ask something... (Press Enter to send)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading || disabled}
      />
      <Button onClick={handleSend} disabled={loading || disabled || !input.trim()}>
        {loading ? "Sending..." : "Send"}
      </Button>
    </div>
  );
}

