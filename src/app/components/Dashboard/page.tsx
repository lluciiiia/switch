"use client";

import { Summary } from "./Summary";
import { WorksPanel } from "./WorksPanel";

const DashboardLayout = () => {
  return (
    <div className="py-6">
      <WorksPanel />
      <Summary />
    </div>
  );
};

export default DashboardLayout;
