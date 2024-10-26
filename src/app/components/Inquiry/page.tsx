"use client";
import { useState } from "react";
import InquiryCard from "./InquiryCard";
import InquiryList from "./InquiryList";
import { inquiries } from "../../data/inquiry";

const InquiryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(inquiries.length / itemsPerPage);

  // Get the current page's inquiries
  const currentInquiries = inquiries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      {inquiries ? (
        <>
          <div>
            <h1 className="text-4xl font-light text-gray-500 my-6 px-4">Inquiry Box</h1>
            <div>
              {/* Render Inquiry Cards for the current page */}
              {currentInquiries.map((inquiry, index) => (
                <InquiryCard key={index} inquiry={inquiry} />
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="px-4 py-2 mr-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 ml-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button>
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
