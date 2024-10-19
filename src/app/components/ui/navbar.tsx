"use client"; // This marks the component as a client component

import React, { useState } from 'react';

interface NavItem {
  label: string;
  value: string;
}

const NavigationBar: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard'); // Default active tab

  const navItems: NavItem[] = [
    { label: 'Dashboard', value: 'dashboard' },
    { label: 'Inquiries', value: 'inquiries' },
    { label: 'Messages', value: 'messages' },
    { label: 'Tasks', value: 'tasks' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <div>Dashboard Content</div>;
      case 'inquiries':
        return <div>Inquiries Content</div>;
      case 'messages':
        return <div>Messages Content</div>;
      case 'tasks':
        return <div>Tasks Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center py-2 bg-white border-b border-gray-200">
        <div className="flex justify-center space-x-10 w-full">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => setActiveTab(item.value)}
              className={`relative text-lg font-medium transition-colors ${
                activeTab === item.value
                  ? 'text-gray-800'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {item.label}
              {activeTab === item.value && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-500 w-full" />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Content based on the active tab */}
      <div className="p-6">{renderContent()}</div>
    </div>
  );
};

export default NavigationBar;