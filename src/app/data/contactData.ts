interface Contact {
  name: string;
  role: string;
  avatar?: string;
}

export const contacts: Record<string, Contact[]> = {
  Housekeeping: [
    {
      name: "Emily Johnson",
      role: "Housekeeping",
      avatar: "https://via.placeholder.com/40",
    },
    {
      name: "Michael Smith",
      role: "Room Attendant",
      avatar: "https://via.placeholder.com/40",
    },
    {
      name: "Sophia Lee",
      role: "Laundry Attendant",
      avatar: "https://via.placeholder.com/40",
    },
    {
      name: "Sophia Lee",
      role: "Laundry Attendant",
      avatar: "https://via.placeholder.com/40",
    },
  ],
  "Front Office": [
    {
      name: "Ava Martinez",
      role: "Front Desk Manager",
      avatar: "https://via.placeholder.com/40",
    },
    {
      name: "Noah Taylor",
      role: "Receptionist",
      avatar: "https://via.placeholder.com/40",
    },
    {
      name: "Isabella Anderson",
      role: "Concierge",
      avatar: "https://via.placeholder.com/40",
    },
    {
      name: "Isabella Anderson",
      role: "Concierge",
      avatar: "https://via.placeholder.com/40",
    },
  ],
  Finance: [
    {
      name: "Ethan Thomas",
      role: "Finance Director",
      avatar: "https://via.placeholder.com/40",
    },
    {
      name: "Mia White",
      role: "Accountant",
      avatar: "https://via.placeholder.com/40",
    },
    {
      name: "Lucas Harris",
      role: "Financial Analyst",
      avatar: "https://via.placeholder.com/40",
    },
    {
      name: "Lucas Harris",
      role: "Financial Analyst",
      avatar: "https://via.placeholder.com/40",
    },
  ],
  Security: [
    {
      name: "James Brown",
      role: "Security Manager",
      avatar: "https://via.placeholder.com/40",
    },
    {
      name: "Olivia Davis",
      role: "Security Officer",
      avatar: "https://via.placeholder.com/40",
    },
    {
      name: "Liam Wilson",
      role: "CCTV Operator",
      avatar: "https://via.placeholder.com/40",
    },
    {
      name: "Liam Wilson",
      role: "CCTV Operator",
      avatar: "https://via.placeholder.com/40",
    },
  ],
  Gaud: [
    {
      name: "James Brown",
      role: "Security Manager",
      avatar: "https://via.placeholder.com/40",
    },
    {
      name: "Olivia Davis",
      role: "Security Officer",
      avatar: "https://via.placeholder.com/40",
    },
    {
      name: "Liam Wilson",
      role: "CCTV Operator",
      avatar: "https://via.placeholder.com/40",
    },
    {
      name: "Liam Wilson",
      role: "CCTV Operator",
      avatar: "https://via.placeholder.com/40",
    },
  ],
};
