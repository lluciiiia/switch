import React, { useState } from 'react';

interface Inquiry {
  profile: string;
  name: string;
  title: string;
  socialMediaType: string;
  dateTime: string;
  icon: string;
}

const InquiryCard = ({ inquiry }: { inquiry: Inquiry }) => {
  // Mock messages with swapped roles (customer asking the receptionist)
  const [messages, setMessages] = useState([
    {
      text: "Hello! I have an appointment, and I need help with the check-in process.",
      sender: "customer", // The customer sends the first message
      time: "2024-04-12 01:47 PM",
    },
    {
      text: "Hello! Thank you for reaching out. Please provide your booking reference, and I'll assist you with the check-in.",
      sender: "receptionist", // Receptionist response
      time: "2024-04-12 01:50 PM",
    },
  ]);

  const recommendations = [
    "Hello! I can help you with the check-in process. Please provide your booking reference number.",
    "If you have any questions about our services, feel free to ask! We are here to help.",
    "Would you like assistance in booking another appointment?",
  ];

  // Mock references data (for receptionist to provide helpful links)
  const references = [
    { title: "Check-In Guide", link: "https://example.com/check-in-guide" },
    { title: "Appointment Rescheduling", link: "https://example.com/reschedule-appointment" },
    { title: "Service Information", link: "https://example.com/service-info" },
  ];

  const [inputMessage, setInputMessage] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      setMessages([
        ...messages,
        { text: inputMessage, sender: "receptionist", time: new Date().toLocaleString() },
      ]);
      setInputMessage("");
    }
  };

  const handleQuickReply = (message: string) => {
    setMessages([
      ...messages,
      { text: message, sender: "receptionist", time: new Date().toLocaleString() },
    ]);
  };

  return (
    <div className="mb-4">
      {/* Inquiry Card */}
      <div
        onClick={handleCardClick}
        className="flex items-center justify-between bg-gray-50 p-4 rounded-md shadow-sm cursor-pointer"
      >
        {/* Profile Section */}
        <div className="flex items-center space-x-4 w-[20%]">
          <div className="w-14 h-14 bg-gray-300 rounded-full flex-shrink-0"></div>
          <div>
            <h3 className="font-semibold">{inquiry.profile}</h3>
            <p className="text-sm text-gray-500">{inquiry.name}</p>
          </div>
        </div>

        {/* Title */}
        <div className="flex-1 px-4 w-[40%]">
          <h3 className="font-medium text-gray-800">{inquiry.title}</h3>
        </div>

        {/* Social Media Type */}
        <div className="flex items-center space-x-2 w-[20%]">
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          <span className="text-gray-600">{inquiry.socialMediaType}</span>
        </div>

        {/* Date/Time */}
        <div className="text-gray-500 w-[20%]">{inquiry.dateTime}</div>

        {/* Action Button/Icon */}
        <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
          {inquiry.icon === 'check' ? '✓' : '✈️'}
        </div>
      </div>

      {/* Expanded Chatbox UI */}
      {isExpanded && (
        <div className="mt-4 p-6 bg-white border border-gray-200 rounded-md shadow-inner">
          {/* Top Chat Section */}
          <div className="h-[300px] mb-6 p-4 border border-gray-200 rounded-md bg-gray-50 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start ${message.sender === "receptionist" ? "justify-end" : "justify-start"} mb-4`}
              >
                {/* Avatar and Customer Name */}
                {message.sender === "customer" ? (
                  <div className="flex flex-col items-center mr-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
                    <p className="text-xs text-gray-500 mt-1">Customer</p>
                  </div>
                ) : null}

                {/* Message */}
                <div className={`bg-gray-${message.sender === "receptionist" ? "200" : "100"} p-3 rounded-lg max-w-md`}>
                  <p className="text-sm text-gray-700">{message.text}</p>
                  <p className="text-xs text-gray-500 mt-2">{message.time}</p>
                </div>

                {/* Receptionist Avatar and Name */}
                {message.sender === "receptionist" ? (
                  <div className="flex flex-col items-center ml-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
                    <p className="text-xs text-gray-500 mt-1">Receptionist</p>
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          {/* Bottom Section - Split into two columns */}
          <div className="grid grid-cols-2 gap-4">
            {/* Recommendations Column */}
            <div className="flex flex-col bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-4 text-gray-800">Recommendations</h3>
              <div className="space-y-4">
                {recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <p className="text-gray-700 text-sm">{recommendation}</p>
                    <button
                      onClick={() => handleQuickReply(recommendation)}
                      className="text-blue-500 text-lg">+</button>
                  </div>
                ))}
              </div>
            </div>

            {/* References Column */}
            <div className="flex flex-col bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-4 text-gray-800">References</h3>
              <div className="space-y-2">
                {references.length > 0 ? (
                  references.map((reference, index) => (
                    <div key={index} className="flex items-center">
                      <a
                        href={reference.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        {reference.title}
                      </a>
                    </div>
                  ))
                ) : (
                  <div className="flex-1 bg-gray-200 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">No references available</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="flex items-center mt-4 p-2 bg-gray-100 rounded-full">
            <input
              type="text"
              className="flex-1 p-3 bg-white rounded-full focus:outline-none"
              placeholder="Send a message"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button onClick={handleSendMessage} className="ml-2 p-3 bg-blue-500 rounded-full text-white">
              ✈️
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InquiryCard;
