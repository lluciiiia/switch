// components/Dashboard.tsx
import { inquiries } from "@/app/data/dashboardData";
import { useState } from "react";

const Dashboard: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<string>("All");
  const [locationFilter, setLocationFilter] = useState<string>("Location");

  const handleTimeFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTimeFilter(event.target.value);
  };

  const handleLocationFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLocationFilter(event.target.value);
  };

  return (
    <div className=" bg-gray-100 h-full flex space-x-8 my-6">
      <div className="space-y-4">
        <div className="flex space-x-4">
          <select
            onChange={handleTimeFilterChange}
            value={timeFilter}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-md"
          >
            <option value="All">All</option>
            <option value="Year">Year</option>
            <option value="Month">Month</option>
            <option value="Day">Day</option>
          </select>
          <select
            onChange={handleLocationFilterChange}
            value={locationFilter}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-md"
          >
            <option value="Location">Location</option>
            <option value="Continent">Continent</option>
            <option value="Country">Country</option>
            <option value="Branch">Branch</option>
          </select>
        </div>
        <h1 className="text-lg">Time</h1>
        <div className="flex space-x-2">
          <select className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-md">
            <option value="Year">Year</option>
          </select>
          <select className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-md">
            <option value="Month">Month</option>
          </select>
          <select className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-md">
            <option value="Day">Day</option>
          </select>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Inquiry <span className="text-orange-500">ranking</span>
        </h2>
        <ul className="space-y-4">
          {inquiries.map((inquiry, index) => (
            <li
              key={inquiry.id}
              className="flex items-center justify-between py-2 border-b border-gray-200"
            >
              <div className="flex items-center">
                <span
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold mr-3 ${
                    index < 3 ? "bg-orange-500" : "bg-teal-500"
                  }`}
                >
                  {index + 1}
                </span>
                <span className="text-gray-700 font-medium">
                  {inquiry.title}
                </span>
              </div>
              <div className="text-gray-500 text-sm">
                {inquiry.count} /{" "}
                <span className="font-semibold text-lg">
                  {inquiry.percentage}%
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
