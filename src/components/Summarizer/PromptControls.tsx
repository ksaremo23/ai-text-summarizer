type PromptControlsProps = {
  length: "short" | "medium" | "long";
  tone: "neutral" | "simple" | "professional";
  bullets: boolean;
  onLengthChange: (length: "short" | "medium" | "long") => void;
  onToneChange: (tone: "neutral" | "simple" | "professional") => void;
  onBulletsChange: (bullets: boolean) => void;
  disabled?: boolean;
};

export function PromptControls({
  length,
  tone,
  bullets,
  onLengthChange,
  onToneChange,
  onBulletsChange,
  disabled = false,
}: PromptControlsProps) {
  return (
    <div className="prompt-controls">
      <div className="control-group">
        <label>Summary Length:</label>
        <div className="control-buttons">
          {(["short", "medium", "long"] as const).map((option) => (
            <button
              key={option}
              className={`control-button ${length === option ? "active" : ""}`}
              onClick={() => onLengthChange(option)}
              disabled={disabled}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="control-group">
        <label>Tone:</label>
        <div className="control-buttons">
          {(["neutral", "simple", "professional"] as const).map((option) => (
            <button
              key={option}
              className={`control-button ${tone === option ? "active" : ""}`}
              onClick={() => onToneChange(option)}
              disabled={disabled}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="control-group">
        <label>
          <input
            type="checkbox"
            checked={bullets}
            onChange={(e) => onBulletsChange(e.target.checked)}
            disabled={disabled}
          />
          Use bullet points
        </label>
      </div>
    </div>
  );
}

