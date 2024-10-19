"use client";
import { useEffect, useState } from "react";
import { getInquiries } from "./controllers/inquiries";
import InquiryList from "./components/Inquiry/InquiryList";
import NavigationBar from "../app/components/ui/navbar"

const InquiryPage = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    getInquiries().then((data) => {
      setInquiries(data);
    });
  }, []);

  return (
    <div>
      {inquiries ? (
        <>
          <h1>Omnichannel Inquiries</h1>
          <InquiryList inquiries={inquiries} />
        </>
      ) : (
        <NavigationBar />
      )}

    </div>
  );
};

export default InquiryPage;
