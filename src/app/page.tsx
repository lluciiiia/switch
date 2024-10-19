"use client";
import { useState } from 'react';
import NavigationBar from './components/ui/navbar'; 
import InquiryPage from './components/Inquiry/page'

const PageWithTabs = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <div>Dashboard Content</div>;
      case 'inquiries':
        return <InquiryPage />;
      case 'messages':
        return <div>Messages Content</div>;
      case 'tasks':
        return <div>Tasks Content</div>;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Pass activeTab and setActiveTab to the NavigationBar */}
      <NavigationBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="p-6">
        {renderContent()}
      </div>
    </>
  );
};

export default PageWithTabs;
