interface Inquiry {
  id: number;
  title: string;
  count: number;
  percentage: number;
}

export const inquiries: Inquiry[] = [
  { id: 1, title: "Reservation-Related Questions", count: 200, percentage: 40 },
  { id: 2, title: "Check-In and Check-Out", count: 174, percentage: 30 },
  { id: 3, title: "Room Information", count: 87, percentage: 15 },
  { id: 4, title: "Facilities", count: 53, percentage: 10 },
  { id: 5, title: "Dining Options", count: 27, percentage: 5 },
];
