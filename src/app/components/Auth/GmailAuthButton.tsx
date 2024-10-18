"use client";

import React from "react";

const GmailAuthButton: React.FC = () => {
  const handleLogin = () => {
    // Redirect to the Gmail OAuth login route
    window.location.href = "/api/v1/auth/gmail";
  };

  return (
    <button
      onClick={handleLogin}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
      Connect Gmail
    </button>
  );
};

export default GmailAuthButton;
