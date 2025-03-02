// src/components/ChatSupport.js
import React, { useState } from "react";
import axios from "axios";

const ChatSupport = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setLoading(true);
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // Send the user message to the Rasa server
      const response = await axios.post("http://localhost:5005/webhooks/rest/webhook", {
        sender: "user",
        message: input,
      });

      // Add the bot's response to the messages
      const aiMessage = response.data[0].text;
      setMessages((prev) => [...prev, { text: aiMessage, sender: "ai" }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Failed to get a response from the AI.", sender: "ai" },
      ]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <div className="fixed bottom-8 right-8 w-80 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col overflow-hidden">
      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-3 p-3 rounded-lg max-w-[80%] ${
              msg.sender === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="mb-3 p-3 rounded-lg bg-gray-200 text-gray-800 max-w-[80%]">
            Typing...
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="flex border-t border-gray-300">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Type your message..."
          disabled={loading}
          className="flex-1 p-3 border-none outline-none"
        />
        <button
          onClick={handleSendMessage}
          disabled={loading}
          className="p-3 bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatSupport;