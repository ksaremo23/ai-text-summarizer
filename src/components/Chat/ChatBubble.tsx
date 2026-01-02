type ChatBubbleProps = {
  message: string;
  role: "user" | "assistant";
};

export function ChatBubble({ message, role }: ChatBubbleProps) {
  return (
    <div className={`chat-bubble chat-bubble-${role}`}>
      <div className="chat-bubble-header">
        <strong>{role === "user" ? "You" : "AI Assistant"}</strong>
      </div>
      <div className="chat-bubble-content">
        <p>{message}</p>
      </div>
    </div>
  );
}

