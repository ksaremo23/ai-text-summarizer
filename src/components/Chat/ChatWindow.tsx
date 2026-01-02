import { useEffect, useRef } from "react";
import { ChatBubble } from "./ChatBubble";
import { Loader } from "../UI/Loader";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatWindowProps = {
  messages: ChatMessage[];
  loading: boolean;
};

export function ChatWindow({ messages, loading }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="chat-window">
      {messages.length === 0 ? (
        <div className="chat-empty">
          <p>Start a conversation with the AI assistant</p>
          <p className="chat-empty-hint">Ask questions, get help, or just chat!</p>
        </div>
      ) : (
        <>
          {messages.map((message, index) => (
            <ChatBubble key={index} message={message.content} role={message.role} />
          ))}
          {loading && (
            <div className="chat-loading">
              <Loader />
            </div>
          )}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
}

