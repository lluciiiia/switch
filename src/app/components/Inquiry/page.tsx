"use client";
import { useEffect, useState } from "react";
import { getInquiries } from "../../controllers/inquiries";
import InquiryList from "./InquiryList";

const InquiryPage = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    getInquiries().then((data) => {
      setInquiries(data);
    });
  }, []);

  return (
    <div>
        <>
          <h1>Omnichannel Inquiries</h1>
          <InquiryList inquiries={inquiries} />
        </>
    </div>
  );
};

export default InquiryPage;
