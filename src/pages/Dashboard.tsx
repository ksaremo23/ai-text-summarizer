import { useState } from "react";
import { Summarizer } from "../components/Summarizer/Summarizer";
import { ChatAssistant } from "../components/Chat/ChatAssistant";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"summarizer" | "chat">("summarizer");

  return (
    <div className="dashboard">
      <div className="dashboard-tabs">
        <button
          className={`tab-button ${activeTab === "summarizer" ? "active" : ""}`}
          onClick={() => setActiveTab("summarizer")}
        >
          📝 Summarizer
        </button>
        <button
          className={`tab-button ${activeTab === "chat" ? "active" : ""}`}
          onClick={() => setActiveTab("chat")}
        >
          💬 Chat Assistant
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === "summarizer" ? <Summarizer /> : <ChatAssistant />}
      </div>
    </div>
  );
}

