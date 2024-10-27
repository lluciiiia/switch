"use client";

import React from "react";

interface NavItem {
  label: string;
  value: string;
}

interface NavigationBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const navItems: NavItem[] = [
    { label: "Dashboard", value: "dashboard" },
    { label: "Inquiries", value: "inquiries" },
    { label: "Messages", value: "messages" },
    { label: "Tasks", value: "tasks" },
    { label: "Check-in/out", value: "checkin" },
    // { label: "Feedback", value: "feedback" },
  ];

  return (
    <div className="w-full mt-4">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center bg-[#F5F5F5] border-b border-gray-200">
        <div className="flex justify-start space-x-10 w-full p-5">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => setActiveTab(item.value)}
              className={`relative text-lg font-medium transition-colors w-28 ${
                activeTab === item.value
                  ? "text-gray-800"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {item.label}
              {activeTab === item.value && (
                <span className="absolute right-0 top-12 h-0.5 bg-gray-500 w-full" />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
