import GmailAuthButton from "@/app/components/Auth/GmailAuthButton";
import React from "react";

const GmailAuthPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Connect Your Gmail Account</h1>
        <p className="mb-6">
          Click the button below to connect your Gmail account for managing
          inquiries.
        </p>
        <GmailAuthButton />
      </div>
    </div>
  );
};

export default GmailAuthPage;
