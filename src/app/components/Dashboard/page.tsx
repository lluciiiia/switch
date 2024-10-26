import { useState } from "react";
import Image from "next/image";
import Annoucement from "./Annoucement";
import Calendar from "./Calendar";
import InquiryRanking from "./InquiryRanking";
import Manual from "./Manual";
import ChatPopup from "./ChatPopup";

const Dashboard: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  return (
    // <div className="my-6 relative">
    //   <div className="bg-gray-100 grid grid-cols-2 gap-8">
    //     <InquiryRanking />
    //     <Calendar />
    //   </div>
    //   <div className="grid grid-cols-2 gap-8 mt-8">
    //     <Annoucement />
    //     <Manual />
    //   </div>
    //   <button
    //     onClick={toggleChat}
    //     className="fixed bottom-8 right-8 rounded-full shadow-lg bg-[#FF8D3D] hover:bg-teal-500 focus:outline-none"
    //   >
    //     <Image src="/images/chatbot.png" alt="Chat" width={60} height={60} />
    //   </button>
    //   {isChatOpen && <ChatPopup onClose={toggleChat} />}
    // </div>
    <div>
      <InquiryRanking />
    </div>
    
  );
};

export default Dashboard;
