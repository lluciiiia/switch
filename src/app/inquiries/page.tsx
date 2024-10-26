"use client";
import InquiryCard from "../components/Inquiry/InquiryCard";
import InquiryList from "../components/Inquiry/InquiryList";

interface Inquiry {
  profile: string;
  name: string;
  title: string;
  socialMediaType: string;
  dateTime: string;
  icon: string;
}

const InquiryPage = () => {
  const inquiries: Inquiry[] = [
    {
      profile: "Michael Green",
      name: "Business Investor",
      title: "Market Expansion Strategies",
      socialMediaType: "Snapchat",
      dateTime: "2024.08.14, 07:46 AM",
      icon: "check",
    },
    {
      profile: "Emily Roberts",
      name: "Business Investor",
      title: "Challenges in Attracting and Retaining Customers",
      socialMediaType: "WhatsApp",
      dateTime: "2024.10.16, 10:35 AM",
      icon: "send",
    },
    {
      profile: "Liam Martinez",
      name: "Business Investor",
      title: "Social Media Engagement",
      socialMediaType: "LinkedIn",
      dateTime: "2024.07.25, 03:57 PM",
      icon: "check",
    },
    {
      profile: "Liam Martinez",
      name: "Business Investor",
      title: "Digital Marketing Campaign",
      socialMediaType: "Telegram",
      dateTime: "2024.07.31, 07:06 AM",
      icon: "check",
    },
    {
      profile: "David Chang",
      name: "Business Investor",
      title: "Investor Relations Report",
      socialMediaType: "WhatsApp",
      dateTime: "2024.08.05, 05:58 AM",
      icon: "check",
    },
    {
      profile: "Ava Davis",
      name: "Business Investor",
      title: "Market Expansion Strategies",
      socialMediaType: "WhatsApp",
      dateTime: "2024.07.24, 06:35 AM",
      icon: "send",
    },
    {
      profile: "David Chang",
      name: "Business Investor",
      title: "Supply Chain Optimization",
      socialMediaType: "LinkedIn",
      dateTime: "2024.09.08, 10:40 AM",
      icon: "check",
    },
    {
      profile: "SeoKyung Kim",
      name: "Business Investor",
      title: "Supply Chain Optimization",
      socialMediaType: "WhatsApp",
      dateTime: "2024.08.31, 02:16 PM",
      icon: "send",
    },
    {
      profile: "Olivia Brown",
      name: "Business Investor",
      title: "Social Media Engagement",
      socialMediaType: "Facebook",
      dateTime: "2024.08.29, 11:08 AM",
      icon: "check",
    },
    {
      profile: "Sophia Lee",
      name: "Business Investor",
      title: "Social Media Engagement",
      socialMediaType: "Telegram",
      dateTime: "2024.09.28, 11:07 AM",
      icon: "check",
    },
  ];

  return (
    <div>
      {inquiries ? (
        <>
          <div>
            <h1 className="text-4xl font-light text-gray-500 my-6 px-4">
              Inquiry Box
            </h1>
            <div>
              {/* Header */}
              <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md mb-4 text-gray-500 font-semibold">
                <div>Profile</div>
                <div>Title</div>
                <div>Social Media Type</div>
                <div>Date/time</div>
              </div>

              {/* Inquiry Cards */}
              {inquiries.map((inquiry, index) => (
                <InquiryCard key={index} inquiry={inquiry} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <h1>Omnichannel Inquiries</h1>
          <InquiryList inquiries={inquiries} />
        </>
      )}
    </div>
  );
};

export default InquiryPage;
