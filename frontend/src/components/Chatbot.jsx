import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I assist you with your AzureHub stay today?" },
  ]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const token = localStorage.getItem("authToken");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

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

  const resetConversation = () => {
    setMessages([
      { from: "bot", text: "Hello! How can I assist you with your AzureHub stay today?" },
    ]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const renderTextWithLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, idx) =>
      urlRegex.test(part) ? (
        <a
          key={idx}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#1E90FF", textDecoration: "underline" }}
        >
          {part}
        </a>
      ) : (
        <span key={idx}>{part}</span>
      )
    );
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 70,
          height: 70,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #3A78D8, #1E90FF)",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontSize: 28,
          boxShadow: "0 8px 20px rgba(30, 144, 255, 0.5)",
          transition: "background 0.3s ease",
          zIndex: 1100,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "linear-gradient(135deg, #5A9BF6, #3A78D8)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "linear-gradient(135deg, #3A78D8, #1E90FF)")
        }
        aria-label={isOpen ? "Close chat" : "Open chat"}
        title={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? "×" : "💬"}
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: 110,
            right: 24,
            width: 420,
            height: 480,
            backgroundColor: "#f0f8ff",
            border: "1px solid #3A78D8",
            borderRadius: 16,
            boxShadow: "0 12px 30px rgba(30, 144, 255, 0.25)",
            display: "flex",
            flexDirection: "column",
            fontFamily: "'Nunito', sans-serif",
            zIndex: 1100,
            animation: "fadeInScale 0.25s ease forwards",
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "#1E90FF",
              padding: "14px 20px",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              fontWeight: "700",
              fontSize: 18,
              color: "white",
              userSelect: "none",
              boxShadow: "0 2px 6px rgba(30, 144, 255, 0.6)",
            }}
          >
            AzureHub Chat
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: 16,
              background: "#e6f0ff",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            className="chat-messages-container"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  textAlign: msg.from === "user" ? "right" : "left",
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    padding: "10px 16px",
                    borderRadius: 20,
                    background: msg.from === "user" ? "#1E90FF" : "#cce0ff",
                    color: msg.from === "user" ? "white" : "#003366",
                    maxWidth: "75%",
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                    boxShadow:
                      msg.from === "user"
                        ? "0 2px 8px rgba(30, 144, 255, 0.4)"
                        : "none",
                    fontSize: 15,
                  }}
                >
                  {renderTextWithLinks(msg.text)}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ textAlign: "left", marginBottom: 12 }}>
                <div
                  style={{
                    display: "inline-block",
                    padding: "10px 16px",
                    borderRadius: 20,
                    background: "#cce0ff",
                    color: "#003366",
                    fontSize: 15,
                    fontStyle: "italic",
                  }}
                >
                  <TypingAnimation />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div
            style={{
              padding: 16,
              borderTop: "1px solid #3A78D8",
              backgroundColor: "#e6f0ff",
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
            }}
          >
            <input
              type="text"
              placeholder="Ask about bookings, availability..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 12,
                border: "1.5px solid #3A78D8",
                fontSize: 15,
                fontFamily: "'Nunito', sans-serif",
                outlineColor: "#1E90FF",
                transition: "border-color 0.2s ease",
                marginBottom: 10,
              }}
              onFocus={(e) => (e.target.style.borderColor = "#1E90FF")}
              onBlur={(e) => (e.target.style.borderColor = "#3A78D8")}
            />

            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                style={{
                  flex: 1,
                  padding: "12px 0",
                  borderRadius: 12,
                  backgroundColor:
                    loading || !input.trim() ? "#a7c0ff" : "#1E90FF",
                  color: "white",
                  border: "none",
                  cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                  fontWeight: "600",
                  fontSize: 16,
                  boxShadow:
                    loading || !input.trim()
                      ? "none"
                      : "0 4px 12px rgba(30,144,255,0.6)",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (!loading && input.trim())
                    e.currentTarget.style.backgroundColor = "#1565c0";
                }}
                onMouseLeave={(e) => {
                  if (!loading && input.trim())
                    e.currentTarget.style.backgroundColor = "#1E90FF";
                }}
              >
                {loading ? "Sending..." : "Send"}
              </button>

              <button
                onClick={resetConversation}
                disabled={loading}
                style={{
                  padding: "12px 0",
                  width: 100,
                  borderRadius: 12,
                  backgroundColor: "#FFD166",
                  color: "#003366",
                  fontWeight: "600",
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "background-color 0.3s ease",
                  boxShadow: "0 4px 12px rgba(255,209,102,0.6)",
                }}
                title="Reset conversation"
              >
                Reset 🔄
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animations & styles */}
      <style>{`
        @keyframes fadeInScale {
          0% {opacity: 0; transform: scale(0.9);}
          100% {opacity: 1; transform: scale(1);}
        }
        .chat-messages-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

// Typing animation components
const TypingAnimation = () => {
  return (
    <span style={{ display: "inline-block", width: 50 }}>
      <Dot delay={0} />
      <Dot delay={0.2} />
      <Dot delay={0.4} />
    </span>
  );
};

const Dot = ({ delay }) => (
  <span
    style={{
      display: "inline-block",
      width: 8,
      height: 8,
      margin: "0 3px",
      backgroundColor: "#003366",
      borderRadius: "50%",
      opacity: 0,
      animation: `blink 1.4s infinite`,
      animationDelay: `${delay}s`,
    }}
  />
);

const styleSheet = `
@keyframes blink {
  0%, 80%, 100% { opacity: 0; }
  40% { opacity: 1; }
}
`;

if (typeof window !== "undefined" && !document.getElementById("typing-dot-style")) {
  const styleTag = document.createElement("style");
  styleTag.id = "typing-dot-style";
  styleTag.innerHTML = styleSheet;
  document.head.appendChild(styleTag);
}

export default Chatbot;
