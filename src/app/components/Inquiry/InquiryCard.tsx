import React from 'react';

interface Inquiry {
    profile: string;
    name: string;
    title: string;
    socialMediaType: string;
    dateTime: string;
    icon: string;
}
const InquiryCard = ({ inquiry }: { inquiry: Inquiry }) => {
    return (
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md mb-4 shadow-sm">
        {/* Profile Section */}
        <div className="flex items-center space-x-4 w-[20%]">
          <div className="w-14 h-14 bg-gray-300 rounded-full flex-shrink-0"></div>
          <div>
            <h3 className="font-semibold">{inquiry.profile}</h3>
            <p className="text-sm text-gray-500">{inquiry.name}</p>
          </div>
        </div>
  
        {/* Title */}
        <div className="flex-1 px-4 w-[40%]">
          <h3 className="font-medium text-gray-800">{inquiry.title}</h3>
        </div>
  
        {/* Social Media Type */}
        <div className="flex items-center space-x-2 w-[20%]">
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          <span className="text-gray-600">{inquiry.socialMediaType}</span>
        </div>
  
        {/* Date/Time */}
        <div className="text-gray-500 w-[20%]">{inquiry.dateTime}</div>
  
        {/* Action Button/Icon */}
        <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
          {inquiry.icon === 'check' ? '✓' : '✈️'}
        </div>
      </div>
    );
  };

export default InquiryCard