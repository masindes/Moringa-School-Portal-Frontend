// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";

// const ChatSupport = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [error, setError] = useState(""); // State for error messages
//   const messagesEndRef = useRef(null);

//   // Scroll to the bottom of the chat when messages change
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   const handleSendMessage = async () => {
//     if (!input.trim()) return; // Prevent sending empty messages

//     setLoading(true);
//     setError(""); // Clear previous errors
//     const userMessage = { text: input, sender: "user" };
//     setMessages((prev) => [...prev, userMessage]);

//     try {
//       const response = await axios.post(
//         "http://localhost:5005/webhooks/rest/webhook",
//         {
//           sender: "user",
//           message: input,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       response.data.forEach((msg) => {
//         setMessages((prev) => [...prev, { text: msg.text, sender: "ai" }]);
//       });
//     } catch (error) {
//       console.error("Error sending message:", error);
//       setError("Failed to connect to the server. Please try again later.");
//       setMessages((prev) => [
//         ...prev,
//         { text: "Failed to get a response from the AI.", sender: "ai" },
//       ]);
//     } finally {
//       setLoading(false);
//       setInput("");
//     }
//   };

//   return (
//     <div className="fixed bottom-32 right-8 z-50">
//       {/* Toggle Button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors"
//       >
//         {isOpen ? (
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         ) : (
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//             />
//           </svg>
//         )}
//       </button>

//       {/* Chat Window */}
//       {isOpen && (
//         <div className="mt-4 w-80 h-96 bg-white/80 backdrop-blur-lg rounded-lg shadow-lg flex flex-col overflow-hidden">
//           {/* Chat Header */}
//           <div className="p-4 bg-green-500/80 text-white flex justify-between items-center">
//             <h2 className="text-lg font-semibold">Chat Support</h2>
//             <button
//               onClick={() => setMessages([])} // Clear chat history
//               className="p-1 hover:bg-green-600/80 rounded-full transition-colors"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                 />
//               </svg>
//             </button>
//           </div>

//           {/* Chat Messages */}
//           <div className="flex-1 p-4 overflow-y-auto bg-gray-50/50">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`mb-3 p-3 rounded-lg max-w-[80%] ${
//                   msg.sender === "user"
//                     ? "bg-green-500/90 text-white ml-auto"
//                     : "bg-gray-200/90 text-gray-800"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             ))}
//             {loading && (
//               <div className="mb-3 p-3 rounded-lg bg-gray-200/90 text-gray-800 max-w-[80%] flex items-center gap-2">
//                 <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
//                 <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
//                 <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
//               </div>
//             )}
//             <div ref={messagesEndRef} /> {/* Scroll to this element */}
//           </div>

//           {/* Chat Input */}
//           <div className="flex border-t border-gray-300/50">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//               placeholder="Type your message..."
//               disabled={loading}
//               className="flex-1 p-3 border-none outline-none bg-transparent"
//             />
//             <button
//               onClick={handleSendMessage}
//               disabled={loading}
//               className="p-3 bg-blue-500/90 text-white hover:bg-blue-600/90 disabled:bg-gray-400/90 disabled:cursor-not-allowed transition-colors"
//             >
//               Send
//             </button>
//           </div>

//           {/* Error Message */}
//           {error && (
//             <div className="p-2 bg-red-100 text-red-600 text-sm text-center">
//               {error}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatSupport;