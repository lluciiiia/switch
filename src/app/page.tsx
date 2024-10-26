"use client";
import { useState } from "react";
import InquiryPage from "./components/Inquiry/page";
import SideLeft from "./components/SideLeft/SideLeft";
import NavigationBar from "./components/ui/navbar";
import Checkin from "./components/CheckIn/page";
import Messages from "./components/Messages/page";
import TaskHandover from "./components/Tasks/page";
import Dashboard from "./components/Dashboard/page";
import Feedback from "./components/Feedback/page";

const PageWithTabs = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "inquiries":
        return <InquiryPage />;
      case "messages":
        return <Messages />;
      case "tasks":
        return <TaskHandover />;
      case "checkin":
        return <Checkin />;
      case "feedback":
        return <Feedback />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-5 h-screen">
      {/* Sidebar */}
      <div className="col-span-1">
        <SideLeft />
      </div>
      <div className="col-span-4 bg-[#F5F5F5] px-10">
        <NavigationBar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div>{renderContent()}</div>
      </div>
    </div>
  );
};

export default PageWithTabs;
