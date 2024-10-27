import React, { useState } from 'react';
import { messages as initialMessages } from '../../data/inquiryMessages';
import { recommendations as initialRecommendations } from '../../data/inquiryRecommendation';
import { references as initialReferences } from '../../data/inquiryReference';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnapchat, faWhatsapp, faTelegram, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

interface Inquiry {
  name: string;
  profile: string;
  title: string;
  socialMediaType: string;
  socialMediaHandle: string;
  dateTime: string;
  icon: string;
  profilePic: string;
}


const socialMediaIcons: { [key: string]: any } = {
  Instagram: "/images/ig.png",
  Telegram: "/images/tele.png",
  Phone: "/images/phone.png",
  Gmail: "/images/gmail.png"
};

const InquiryCard = ({ inquiry }: { inquiry: Inquiry }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [recommendations, setRecommendations] = useState(initialRecommendations);
  const [references, setReferences] = useState(initialReferences);
  const [inputMessage, setInputMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev); // Toggles the modal state
  };

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: inputMessage,
          sender: 'receptionist',
          time: new Date().toLocaleString(),
        },
      ]);
      setInputMessage('');
      setSelectedRecommendation(null);
    }
  };

  const handleQuickReply = (message: string) => {
    if (selectedRecommendation === message) {
      setInputMessage('');
      setSelectedRecommendation(null);
    } else {
      setInputMessage(message);
      setSelectedRecommendation(message);
    }
  };

  return (
    <div className="space-y-0 pb-3"> {/* Set to space-y-0 to remove any vertical gaps between cards */}
      <div
        className={`${isExpanded ? '' : 'bg-white rounded-[20px]'}`}
      >
        {isExpanded ? (
          <div className="flex items-center shadow-sm pb-3 space-x-6">
            {/* Profile and Name Section */}
            <div
              onClick={handleCardClick}
              className="flex items-center space-x-4 bg-white shadow-lg rounded-[20px] p-3 pr-12"
            >
              <Image
                src={inquiry.profilePic}
                alt={`${inquiry.profile}'s profile picture`}
                width={40} // Set width in pixels
                height={40} // Set height in pixels
                className="rounded-full object-cover flex-shrink-0"
              />
              <div>
                <h3 className="text-gray-800 font-semibold">{inquiry.name}</h3>
                <p className="text-sm text-gray-500">{inquiry.socialMediaHandle}</p>
              </div>
            </div>
            {/* Divider */}
            <div className="h-10 w-px bg-gray-300 mx-4"></div>

            {/* Social Media Section */}
            <div className="flex items-center space-x-2">
              {socialMediaIcons[inquiry.socialMediaType] ? (
                <img
                  src={socialMediaIcons[inquiry.socialMediaType]}
                  alt={inquiry.socialMediaType}
                  className="w-5 h-5 rounded-full"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faSnapchat} // default icon if none is found
                  className="w-6 h-6 text-gray-600"
                />
              )}
              <span className="text-gray-600 font-medium">{inquiry.socialMediaType}</span>
            </div>

            {/* Generating Summary Button and Modal Container */}
            <div className="relative inline-block">
              {/* Generating Summary Button */}
              {inquiry.socialMediaType !== 'Phone' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleModalToggle();
                  }}
                  className="px-4 py-1 pb-3 pt-3 bg-lime-900 border text-zinc-50 rounded-2xl text-sm font-medium"
                  disabled={inquiry.socialMediaType === 'Phone'}
                >
                  Generating Summary
                </button>)}

              {/* Generate Summary Modal */}
              {isModalOpen && (
                <div className="absolute left-full ml-2 top-0 bg-white rounded-2xl shadow w-96 max-w-lg p-6 z-50">
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-700">Summary</h2>
                    <hr className="border-gray-300 mt-2" />
                  </div>
                  <div className="text-gray-700 space-y-4 text-sm">
                    <div>
                      <h3 className="font-semibold text-gray-800">1. Reservation Inquiries</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Requests for changes or cancellations</li>
                        <li>Availability of room upgrades</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">2. Facility Usage Inquiries</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Operating hours for the pool and gym</li>
                        <li>How to access free Wi-Fi and internet</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">3. Service Requests</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Room service menu and ordering process</li>
                        <li>How to use laundry services</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Default Card Layout
          <div onClick={handleCardClick} className="flex items-center justify-between p-4 rounded-sm shadow-sm">
            <div className="flex items-center space-x-4 w-[20%]">
              <Image
                src={inquiry.profilePic}
                alt={`${inquiry.profile}'s profile picture`}
                width={40} // Set width in pixels
                height={40} // Set height in pixels
                className="rounded-full object-cover flex-shrink-0"
              />
              <div>
                <h4 className="font-semibold">{inquiry.name}</h4>
                <p className="text-sm text-gray-500">{inquiry.profile}</p>
              </div>
            </div>
            <div className="flex-1 px-4 w-[40%]">
              <h4 className="font-medium text-gray-800">{inquiry.title}</h4>
            </div>
            <div className="flex items-center space-x-2 w-[20%]">
              {socialMediaIcons[inquiry.socialMediaType] ? (
                <img
                  src={socialMediaIcons[inquiry.socialMediaType]}
                  alt={inquiry.socialMediaType}
                  className="w-5 h-5 rounded-full"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faSnapchat} // default icon if none is found
                  className="w-6 h-6 text-gray-600"
                />
              )}
              <span className="text-gray-600 font-medium">{inquiry.socialMediaType}</span>
            </div>
            <div className="text-gray-500 w-[20%] text-xs">{inquiry.dateTime}</div>
            <div
              className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white -ml-2 ${inquiry.icon === 'check' ? 'bg-yellow-500' : 'bg-blue-500'
                }`}
            >
              {inquiry.icon === 'check' ? (
                '✓'
              ) : (
                <FontAwesomeIcon icon={faPaperPlane} className="text-lg" />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Expanded Chatbox UI with Smooth Animation */}
      <div
        className={`transition-all duration-300 ease-in-out rounded-[20px] overflow-hidden ${isExpanded ? 'max-h-[900px] opacity-100 pb-2 pr-2 pl-2 pt-2' : 'max-h-[0px] opacity-0'
          } bg-white border border-gray-200 rounded-md shadow-inner`}
      >
        {inquiry.socialMediaType === 'Phone' ? (
          // Alternative Extended View for Phone
          <div className="flex gap-4 p-4 bg-white rounded-md shadow-lg">
            {/* Left Column - AI Phone Call Summary */}
            <div className="flex-1 p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">Summary with AI Phone Call</h2>
              <div className="text-gray-600 space-y-2">
                <p>1. Customer asked about blah blah.</p>
                <p>2. AI answered blah blah.</p>
                <p>3. AI decided to route the call to the Front Desk team.</p>
              </div>
            </div>

            {/* Right Column - Receptionist Summary */}
            <div className="flex-1 p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src="/images/emp3.jpg" // Replace with actual image path or URL
                  alt="Ava Martinez"
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div>
                  <h3 className="text-md font-semibold text-gray-700">Ava Martinez</h3>
                  <p className="text-sm text-gray-500">Front Desk Manager, Lyf Melbourne</p>
                </div>
              </div>
              <div className="text-gray-600 space-y-3">
                <h3 className="font-semibold text-gray-700">1. Reservation Inquiries</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Requests for changes or cancellations</li>
                  <li>Availability of room upgrades</li>
                </ul>

                <h3 className="font-semibold text-gray-700 mt-3">2. Facility Usage Inquiries</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Operating hours for the pool and gym</li>
                  <li>How to access free Wi-Fi and internet</li>
                </ul>

                <h3 className="font-semibold text-gray-700 mt-3">3. Service Requests</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Room service menu and ordering process</li>
                  <li>How to use laundry services</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          // Default Expanded View for Other Social Media Types
          <>
            {/* Top Chat Section */}
            <div className="h-[300px] mb-3 p-4 border-gray-200 rounded-md bg-white-100 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start ${message.sender === 'receptionist' ? 'justify-end' : 'justify-start'} mb-4`}
                >
                  {message.sender === 'customer' && (
                    <div className="flex flex-col items-center mr-4">
                      <Image
                        src={inquiry.profilePic}
                        alt={`${inquiry.profile}'s profile picture`}
                        width={40}
                        height={40}
                        className="rounded-full object-cover flex-shrink-0"
                      />
                      <p className="text-xs text-gray-500 mt-1">Customer</p>
                    </div>
                  )}
                  <div className={`bg-gray-${message.sender === 'receptionist' ? '200' : '100'} p-3 rounded-lg max-w-md`}>
                    <p className="text-sm text-gray-700">{message.text}</p>
                    <p className="text-xs text-gray-500 mt-2">{message.time}</p>
                  </div>
                  {message.sender === 'receptionist' && (
                    <div className="flex flex-col items-center ml-4">
                      <Image
                        src="/images/profile.png"
                        alt={`Receptionist's profile picture`}
                        width={40}
                        height={40}
                        className="rounded-full object-cover flex-shrink-0"
                      />
                      <p className="text-xs text-gray-500 mt-1">Receptionist</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Section - Recommendations and References */}
            <div className="grid grid-cols-5 gap-4 pb-3">
              {/* Recommendations - Taking up 3/5 of the space */}
              <div className="col-span-3 flex flex-col p-4 rounded-lg">
                <h3 className="font-semibold mb-4 text-orange-500">Recommendations</h3>
                <div>
                  {recommendations.map((recommendation, index) => (
                    <div
                      key={recommendation.id}
                      className={`flex items-start py-4 ${index > 0 ? 'border-t border-gray-300' : ''}`}
                    >
                      {recommendation.translatedText ? (
                        <div className="flex-1 grid grid-cols-2 gap-4">
                          <p className="text-gray-700 text-sm break-words">{recommendation.text}</p>
                          <p className="text-gray-700 text-sm break-words">{recommendation.translatedText}</p>
                        </div>
                      ) : (
                        <div className="flex-1">
                          <p className="text-gray-700 text-sm break-words">{recommendation.text}</p>
                        </div>
                      )}
                      <button
                        onClick={() => handleQuickReply(recommendation.translatedText ?? recommendation.text)}
                        className="text-orange-500 text-lg ml-4"
                      >
                        +
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* References - Taking up 2/5 of the space */}
              <div className="col-span-2 flex flex-col p-4 rounded-lg">
                <h3 className="font-semibold mb-4 text-orange-500">References</h3>
                <div className="bg-gray-100 p-4 rounded-lg min-h-[200px]">
                  {references.length > 0 ? (
                    references.map((reference) => (
                      <div key={reference.id} className="flex items-center text-sm">
                        {reference.text}
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
            <div className="flex items-center mt-4 p2 border-2 rounded-full">
              <input
                type="text"
                className="flex-1 p-3 bg-white rounded-full focus:outline-none"
                placeholder="Send a message"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <button onClick={handleSendMessage} className="px-4 py-3 bg-teal-500 text-white rounded-full">
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </>
        )}
      </div>

    </div >
  );


};

export default InquiryCard;
