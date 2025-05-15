import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I assist you with your AzureHub stay today?" },
  ]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("authToken");

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((msgs) => [...msgs, { from: "user", text: input }]);
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/ask",
        { message: input },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      const replyMessage =
        typeof response.data.reply === "string"
          ? response.data.reply
          : response.data.reply?.message || "🤖 Sorry, I couldn't understand that.";

      setMessages((msgs) => [...msgs, { from: "bot", text: replyMessage }]);
    } catch (err) {
      setMessages((msgs) => [...msgs, { from: "bot", text: "❌ Sorry, something went wrong." }]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // Function to detect and convert URLs into anchor tags
  const renderTextWithLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, idx) =>
      urlRegex.test(part) ? (
        <a key={idx} href={part} target="_blank" rel="noopener noreferrer" style={{ color: "#0645AD" }}>
          {part}
        </a>
      ) : (
        <span key={idx}>{part}</span>
      )
    );
  };

  return (
    <div style={{ width: 400, border: "1px solid #ccc", padding: 10, borderRadius: 8, background: "#f7f9ff" }}>
      <div
        style={{
          height: 300,
          overflowY: "auto",
          padding: 10,
          background: "#e0e9ff",
          borderRadius: 8,
          marginBottom: 10,
          fontFamily: "Arial, sans-serif",
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              textAlign: msg.from === "user" ? "right" : "left",
              marginBottom: 8,
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: 16,
                background: msg.from === "user" ? "#3872dd" : "#d4e1ff",
                color: msg.from === "user" ? "white" : "#000",
                maxWidth: "80%",
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
              }}
            >
              {renderTextWithLinks(msg.text)}
            </div>
          </div>
        ))}
      </div>

      <input
        type="text"
        placeholder="Ask about bookings, availability..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
      />
      <button onClick={sendMessage} disabled={loading || !input.trim()} style={{ marginTop: 8, width: "100%" }}>
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  );
};

export default Chatbot;
