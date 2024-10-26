import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faXmark } from "@fortawesome/free-solid-svg-icons";

interface Message {
  text: string;
  isUser: boolean;
}

const ChatPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessages = [...messages, { text: message, isUser: true }];
      setMessages(newMessages);
      setMessage("");

      if (
        message.toLowerCase() ===
        "fee for airport transportation from the hotel?"
      ) {
        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              text: "Airport transportation. Shuttle service: Costs $12 and runs every hour, Private car: Costs $15.",
              isUser: false,
            },
          ]);
        }, 500);
      }
    }
  };

  return (
    <div className="fixed bottom-16 right-20 bg-white border border-gray-300 rounded-lg shadow-lg w-96 h-[30rem] flex flex-col">
      <div className="flex justify-between items-center p-4 border-b border-gray-300">
        <h2 className="text-lg font-semibold">Desk Chat</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 flex ${
              msg.isUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-2 rounded-lg ${
                msg.isUser ? "bg-blue-100" : "bg-gray-100"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-300 flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-2 py-1"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-teal-500 text-white px-4 py-1 rounded-lg"
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default ChatPopup;
