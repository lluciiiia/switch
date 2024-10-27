import React, { useState } from "react";
import { Inquiry, inquiries, timeOptions, locationOptions, LocationType } from "@/app/data/dashboardData";

// Interfaces for Props
interface DropdownProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}

interface InquiryItemProps {
  inquiry: Inquiry;
  index: number;
  colorClass: string;
}

interface InquiryListProps {
  inquiries: Inquiry[];
  startIndex: number;
  colorClass: string;
}

// Dropdown Component
const Dropdown: React.FC<DropdownProps> = ({ label, value, onChange, options }) => (
  <div>
    <label className="block text-gray-600 mb-1">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 bg-white"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

// InquiryItem Component
const InquiryItem: React.FC<InquiryItemProps> = ({ inquiry, index, colorClass }) => (
  <li className="flex items-center justify-between py-2 border-b border-gray-200">
    <div className="flex items-center">
      <span
        className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold mr-3 ${colorClass}`}
      >
        {index + 1}
      </span>
      <span className="text-gray-700 font-medium">{inquiry.title}</span>
    </div>
    <div className="text-gray-500 text-sm">
      {inquiry.count} / <span className="font-semibold text-lg">{inquiry.percentage}%</span>
    </div>
  </li>
);

// InquiryList Component
const InquiryList: React.FC<InquiryListProps> = ({ inquiries, startIndex, colorClass }) => (
  <ul className="space-y-4">
    {inquiries.map((inquiry, index) => (
      <InquiryItem
        key={inquiry.id}
        inquiry={inquiry}
        index={startIndex + index}
        colorClass={colorClass}
      />
    ))}
  </ul>
);

// Main Component
const InquiryRanking: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState("Year");
  const [selectedMonth, setSelectedMonth] = useState("Month");
  const [selectedDay, setSelectedDay] = useState("Day");
  const [selectedLocationType, setSelectedLocationType] = useState<LocationType>("Property");
  const [selectedLocation, setSelectedLocation] = useState("Funan");

  const leftColumnInquiries = inquiries.slice(0, 5);
  const rightColumnInquiries = inquiries.slice(5);

  return (
    <div className="mt-8">
      {/* Filters Section */}
      <div className="flex items-center justify-between mb-6 space-x-8">
        <div>
          <label className="block text-gray-600 mb-1">Time</label>
          <div className="flex items-center space-x-2">
            <Dropdown label="" value={selectedYear} onChange={setSelectedYear} options={timeOptions.year} />
            <Dropdown label="" value={selectedMonth} onChange={setSelectedMonth} options={timeOptions.month} />
            <Dropdown label="" value={selectedDay} onChange={setSelectedDay} options={timeOptions.day} />
          </div>
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Location</label>
          <div className="flex items-center space-x-2">
            <Dropdown
              label=""
              value={selectedLocationType}
              onChange={(value) => setSelectedLocationType(value as LocationType)}
              options={locationOptions.type}
            />
            <Dropdown
              label=""
              value={selectedLocation}
              onChange={setSelectedLocation}
              options={locationOptions.specific[selectedLocationType]}
            />
          </div>
        </div>
      </div>

      {/* Inquiry Ranking Section */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-lg w-full">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Inquiry <span className="text-orange-500">ranking</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InquiryList inquiries={leftColumnInquiries} startIndex={0} colorClass="bg-orange-500" />
          <InquiryList inquiries={rightColumnInquiries} startIndex={5} colorClass="bg-teal-500" />
        </div>
      </div>
    </div>
  );
};

export default InquiryRanking;
