interface Contact {
  name: string;
  role: string;
}

export const contacts: Record<string, Contact[]> = {
  Housekeeping: [
    { name: "Emily Johnson", role: "Housekeeping" },
    { name: "Michael Smith", role: "Room Attendant" },
    { name: "Sophia Lee", role: "Laundry Attendant" },
    { name: "Sophia Lee", role: "Laundry Attendant" },
  ],
  "Front Office": [
    { name: "Ava Martinez", role: "Front Desk Manager" },
    { name: "Noah Taylor", role: "Receptionist" },
    { name: "Isabella Anderson", role: "Concierge" },
    { name: "Isabella Anderson", role: "Concierge" },
  ],
  Finance: [
    { name: "Ethan Thomas", role: "Finance Director" },
    { name: "Mia White", role: "Accountant" },
    { name: "Lucas Harris", role: "Financial Analyst" },
    { name: "Lucas Harris", role: "Financial Analyst" },
  ],
  Security: [
    { name: "James Brown", role: "Security Manager" },
    { name: "Olivia Davis", role: "Security Officer" },
    { name: "Liam Wilson", role: "CCTV Operator" },
    { name: "Liam Wilson", role: "CCTV Operator" },
  ],
  Gaud: [
    { name: "James Brown", role: "Security Manager" },
    { name: "Olivia Davis", role: "Security Officer" },
    { name: "Liam Wilson", role: "CCTV Operator" },
    { name: "Liam Wilson", role: "CCTV Operator" },
  ],
};
