type TextInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
  disabled?: boolean;
};

export function TextInput({
  value,
  onChange,
  onSubmit,
  loading,
  disabled = false,
}: TextInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (!loading && !disabled && value.trim()) {
        onSubmit();
      }
    }
  };

  return (
    <div className="text-input-container">
      <textarea
        className="text-input"
        placeholder="Paste text here to summarize..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={8}
        disabled={loading || disabled}
      />
      <button
        className="submit-button"
        onClick={onSubmit}
        disabled={loading || disabled || !value.trim()}
      >
        {loading ? "Summarizing..." : "Summarize"}
      </button>
    </div>
  );
}

