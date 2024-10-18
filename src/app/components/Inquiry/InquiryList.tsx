import InquiryItem from "./InquiryItem";

const InquiryList = ({ inquiries }: { inquiries: any[] }) => {
  return (
    <div>
      {inquiries.length === 0 ? (
        <p>No inquiries to display</p>
      ) : (
        inquiries.map((inquiry) => (
          <InquiryItem key={inquiry.id} inquiry={inquiry} />
        ))
      )}
    </div>
  );
};

export default InquiryList;
