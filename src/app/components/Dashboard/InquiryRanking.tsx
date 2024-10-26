import React from "react";
import { inquiries } from "@/app/data/dashboardData";

const InquiryRanking = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full">
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
              <span className="text-gray-700 font-medium">{inquiry.title}</span>
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
  );
};

export default InquiryRanking;
