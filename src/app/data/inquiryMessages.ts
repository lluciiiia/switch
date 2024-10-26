interface Message {
    id: number;
    text: string;
    sender: string;
    time: string;
}

export const messages: Message[] = [
    {
        id: 1,
        text: "Hello! I have an appointment, and I need help with the check-in process.",
        sender: "customer",
        time: "2024-04-12 01:47 PM",
    },
    {
        id: 2,
        text: "Hello! Thank you for reaching out. Please provide your booking reference, and I'll assist you with the check-in.",
        sender: "receptionist",
        time: "2024-04-12 01:50 PM",
    },
];
