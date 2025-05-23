//c


import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi there! 🌿 How can I help you with your AzureHub staycation?" },
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
          : response.data.reply?.message || "🌱 Sorry, I didn't catch that.";

      setMessages((msgs) => [...msgs, { from: "bot", text: replyMessage }]);
    } catch (err) {
      setMessages((msgs) => [...msgs, { from: "bot", text: "❌ Something went wrong." }]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const resetConversation = () => {
    setMessages([
      { from: "bot", text: "Hi there! 🌿 How can I help you with your AzureHub staycation?" },
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
          style={{ color: "#4CAF50", textDecoration: "underline" }}
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
      {/* Sticky Bar */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: 90,
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
          maxWidth: 600,
          height: 60,
          borderRadius: 30,
          background: "linear-gradient(135deg, #A8E6CF, #4CAF50)",
          color: "#fff",
          fontSize: 18,
          fontWeight: "600",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 20px rgba(76, 175, 80, 0.4)",
          cursor: "pointer",
          zIndex: 9999,
          userSelect: "none",
        }}
        title={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? "Close Chat ✖️" : "Need Help? Chat with us 🌿"}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: 160,
            left: "50%",
            transform: "translateX(-50%)",
            width: "90%",
            maxWidth: 600,
            height: "75vh",
            backgroundColor: "#F1F8E9",
            border: "1px solid #81C784",
            borderRadius: 20,
            boxShadow: "0 12px 30px rgba(76, 175, 80, 0.25)",
            display: "flex",
            flexDirection: "column",
            fontFamily: "'Nunito', sans-serif",
            zIndex: 9998,
            animation: "slideUp 0.3s ease forwards",
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "#66BB6A",
              padding: "14px 20px",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              fontWeight: "700",
              fontSize: 20,
              color: "#fff",
              userSelect: "none",
              boxShadow: "0 2px 6px rgba(102, 187, 106, 0.6)",
            }}
          >
             Ms. Ella 
          </div>


          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: 16,
              background: "#E8F5E9",
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
                    background: msg.from === "user" ? "#4CAF50" : "#C8E6C9",
                    color: msg.from === "user" ? "#fff" : "#1B5E20",
                    maxWidth: "75%",
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                    boxShadow:
                      msg.from === "user"
                        ? "0 2px 8px rgba(76, 175, 80, 0.4)"
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
                    background: "#C8E6C9",
                    color: "#1B5E20",
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
              borderTop: "1px solid #81C784",
              backgroundColor: "#F1F8E9",
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
            <input
              type="text"
              placeholder="Ask about rooms, check-in, amenities..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 12,
                border: "1.5px solid #81C784",
                fontSize: 15,
                fontFamily: "'Nunito', sans-serif",
                outlineColor: "#66BB6A",
                marginBottom: 10,
              }}
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
                    loading || !input.trim() ? "#A5D6A7" : "#4CAF50",
                  color: "#fff",
                  border: "none",
                  cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                  fontWeight: "600",
                  fontSize: 16,
                  boxShadow:
                    loading || !input.trim()
                      ? "none"
                      : "0 4px 12px rgba(76,175,80,0.4)",
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
                  backgroundColor: "#FFEB3B",
                  color: "#33691E",
                  fontWeight: "600",
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: "0 4px 12px rgba(255,235,59,0.6)",
                }}
              >
                Reset 🔄
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes slideUp {
          0% { opacity: 0; transform: translate(-50%, 40px); }
          100% { opacity: 1; transform: translate(-50%, 0); }
        }
        .chat-messages-container::-webkit-scrollbar {
          display: none;
        }
        @keyframes blink {
          0%, 80%, 100% { opacity: 0; }
          40% { opacity: 1; }
        }
      `}</style>
    </>
  );
};

const TypingAnimation = () => (
  <span style={{ display: "inline-block", width: 50 }}>
    <Dot delay={0} />
    <Dot delay={0.2} />
    <Dot delay={0.4} />
  </span>
);

const Dot = ({ delay }) => (
  <span
    style={{
      display: "inline-block",
      width: 8,
      height: 8,
      margin: "0 3px",
      backgroundColor: "#2E7D32",
      borderRadius: "50%",
      opacity: 0,
      animation: `blink 1.4s infinite`,
      animationDelay: `${delay}s`,
    }}
  />
);

export default Chatbot;
