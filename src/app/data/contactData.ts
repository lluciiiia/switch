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
      avatar: "/images/emp17.jpg",
    },
    {
      name: "Michael Smith",
      role: "Room Attendant",
      avatar: "/images/emp18.jpg",
    },
    {
      name: "Sophia Lee",
      role: "Laundry Attendant",
      avatar: "/images/emp16.jpg",
    },
  ],
  "Front Office": [
    {
      name: "Ava Martinez",
      role: "Front Desk Manager",
      avatar: "/images/emp14.jpg",
    },
    {
      name: "Noah Taylor",
      role: "Receptionist",
      avatar: "/images/emp6.jpg",
    },
    {
      name: "Isabella Anderson",
      role: "Concierge",
      avatar: "/images/emp19.jpg",
    },
  ],
  Finance: [
    {
      name: "Ethan Thomas",
      role: "Finance Director",
      avatar: "/images/emp8.jpg",
    },
    {
      name: "Mia White",
      role: "Accountant",
      avatar: "/images/emp12.jpg",
    },
    {
      name: "Lucas Harris",
      role: "Financial Analyst",
      avatar: "/images/emp11.jpg",
    },
  ],
  Guard: [
    {
      name: "James Brown",
      role: "Security Manager",
      avatar:"/images/emp20.jpg",
    },
    {
      name: "Olivia Davis",
      role: "Security Officer",
      avatar: "/images/emp4.jpg",
    },
    {
      name: "Liam Wilson",
      role: "CCTV Operator",
      avatar: "/images/emp15.jpg",
    },
  ],
};
