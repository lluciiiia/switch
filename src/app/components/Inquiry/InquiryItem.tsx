const InquiryItem = ({ inquiry }: { inquiry: any }) => {
  return (
    <div>
      <h3>{inquiry.title}</h3>
      <p>Source: {inquiry.source}</p>
      <p>
        Customer: {inquiry.customerName} - {inquiry.customerContact}
      </p>
      <p>Summary: {inquiry.summary}</p>
    </div>
  );
};

export default InquiryItem;
