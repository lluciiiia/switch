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
      avatar: "/images/emp1.jpg",
    },
    {
      name: "Michael Smith",
      role: "Room Attendant",
      avatar: "/images/emp2.jpg",
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
      avatar: "/images/emp3.jpg",
    },
    {
      name: "Noah Taylor",
      role: "Receptionist",
      avatar: "/images/emp6.jpg",
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
      avatar:"/images/emp5.jpg",
    },
    {
      name: "Olivia Davis",
      role: "Security Officer",
      avatar: "/images/emp4.jpg",
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
