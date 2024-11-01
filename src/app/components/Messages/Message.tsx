import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

interface Message {
  from: string;
  message: string;
  time: string;
}

interface Contact {
  name: string;
  role: string;
  avatar?: string;
}

interface MessageAreaProps {
  selectedContact: Contact;
}

const MessageArea: React.FC<MessageAreaProps> = ({ selectedContact }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      from: selectedContact.name,
      message: "Hello! How can I help you?",
      time: "2024-05-12 01:47 PM",
    },
  ]);
  const [input, setInput] = useState<string>("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        { from: "You", message: input, time: new Date().toLocaleTimeString() },
      ]);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-[580px] bg-white shadow p-4 rounded-lg w-full">
      <div className="flex items-center space-x-2 space-mb-4">
        <img
          src={selectedContact.avatar}
          alt={selectedContact.name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-medium">{selectedContact.name}</p>
          <p className="text-sm text-gray-500">{selectedContact.role}</p>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto border-t-2 border-gray-200 py-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 flex ${msg.from === "You" ? "justify-end" : "justify-start"}`}
          >
            <div className="flex gap-2 items-center">
              {msg.from !== "You" && (
                <img
                  src={selectedContact.avatar}
                  alt={selectedContact.name}
                  className="w-5 h-5 rounded-full"
                />
              )}
              <p
                className={`text-sm text-gray-700 p-2 w-fit rounded-full ${msg.from === "You" ? "bg-teal-500 text-white" : "bg-gray-100"}`}
              >
                {msg.message}
              </p>
              {msg.from === "You" && (
                <img
                  src="/images/profile.png"
                  alt={selectedContact.name}
                  className="w-5 h-5 rounded-full"
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center border-t-2 border-gray-200 pt-4">
        <input
          type="text"
          className="flex-grow border border-gray-300 rounded-lg p-2 mr-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Send a message"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-teal-500 text-white rounded-md"
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default MessageArea;
