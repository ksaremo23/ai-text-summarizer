import { useState } from "react";
import { ChatWindow, type ChatMessage } from "./ChatWindow";
import { ChatInput } from "./ChatInput";
import { Button } from "../UI/Button";
import { callAI, type AIMessage } from "../../services/aiService";

export function ChatAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (userMessage: string) => {
    const newMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: userMessage },
    ];
    setMessages(newMessages);
    setLoading(true);

    try {
      // Build conversation history for context
      const aiMessages: AIMessage[] = [
        {
          role: "system",
          content:
            "You are a helpful AI assistant. Answer clearly and concisely. Be friendly and professional.",
        },
        ...newMessages.map((msg) => ({
          role: msg.role as "user" | "assistant",
          content: msg.content,
        })),
      ];

      const result = await callAI(aiMessages, {
        temperature: 0.8,
        max_tokens: 1000,
      });

      if (result.error) {
        setMessages([
          ...newMessages,
          { role: "assistant", content: `Error: ${result.error}` },
        ]);
      } else {
        setMessages([...newMessages, { role: "assistant", content: result.content }]);
      }
    } catch (err) {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: err instanceof Error ? err.message : "An unexpected error occurred",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([]);
  };

  return (
    <div className="chat-assistant-container">
      <div className="section-header">
        <h2>Chat Assistant</h2>
        <p>Have a conversation with AI</p>
        {messages.length > 0 && (
          <Button onClick={handleClear} variant="secondary" disabled={loading}>
            Clear Conversation
          </Button>
        )}
      </div>

      <ChatWindow messages={messages} loading={loading} />
      <ChatInput onSend={handleSend} loading={loading} />
    </div>
  );
}

