interface Task {
  taskId: number;
  description: string;
  dueDate: string;
  status: string; // Pending, In Progress, Completed
}

interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  avatar: string;
  tasks: Task[]; // Tasks assigned to each employee
}

export const employees: Employee[] = [
  {
    id: 1,
    name: "Emily Johnson",
    role: "Housekeeping Supervisor",
    department: "Housekeeping",
    avatar: "/images/emp1.jpg",
    tasks: [
      {
        taskId: 101,
        description: "Clean Room 101",
        dueDate: "2024-10-25",
        status: "Pending",
      },
      {
        taskId: 102,
        description: "Restock towels in Room 202",
        dueDate: "2024-10-25",
        status: "In Progress",
      },
    ],
  },
  {
    id: 2,
    name: "Michael Smith",
    role: "Room Attendant",
    department: "Housekeeping",
    avatar: "/images/emp2.jpg",
    tasks: [
      {
        taskId: 103,
        description: "Vacuum hallway on floor 3",
        dueDate: "2024-10-25",
        status: "Pending",
      },
      {
        taskId: 104,
        description: "Deliver fresh linens to Room 304",
        dueDate: "2024-10-26",
        status: "Completed",
      },
    ],
  },
  {
    id: 3,
    name: "James Brown",
    role: "Security Manager",
    department: "Security",
    avatar: "/images/emp5.jpg",
    tasks: [
      {
        taskId: 105,
        description: "Check CCTV footage for last 24 hours",
        dueDate: "2024-10-25",
        status: "Pending",
      },
    ],
  },
  {
    id: 4,
    name: "Olivia Davis",
    role: "Security Officer",
    department: "Security",
    avatar: "/images/emp4.jpg",
    tasks: [
      {
        taskId: 106,
        description: "Patrol parking area",
        dueDate: "2024-10-25",
        status: "In Progress",
      },
      {
        taskId: 107,
        description: "Monitor cameras for suspicious activity",
        dueDate: "2024-10-25",
        status: "Completed",
      },
    ],
  },
  {
    id: 5,
    name: "Ava Martinez",
    role: "Front Desk Manager",
    department: "Front Office",
    avatar: "/images/emp3.jpg",
    tasks: [
      {
        taskId: 108,
        description: "Coordinate with housekeeping for room 502",
        dueDate: "2024-10-25",
        status: "Pending",
      },
    ],
  },
  {
    id: 6,
    name: "Noah Taylor",
    role: "Receptionist",
    department: "Front Office",
    avatar: "/images/emp6.jpg",
    tasks: [
      {
        taskId: 109,
        description: "Greet and check in VIP guest",
        dueDate: "2024-10-25",
        status: "Completed",
      },
      {
        taskId: 110,
        description: "Arrange taxi service for guest",
        dueDate: "2024-10-26",
        status: "In Progress",
      },
      {
        taskId: 108,
        description: "Coordinate with housekeeping room 508",
        dueDate: "2024-10-25",
        status: "Pending",
      },
    ],
  },
];
