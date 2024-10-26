interface Feedback {
  id: number;
  date: string;
  location: string;
  sentiment: string;
  category: string;
  rating: number;
  comment: string;
}

export const feedbackData: Feedback[] = [
  {
    id: 1,
    date: "2024-10-01",
    location: "New York",
    sentiment: "positive",
    category: "cleanliness",
    rating: 5,
    comment: "The room was spotless!",
  },
  {
    id: 2,
    date: "2024-10-02",
    location: "Los Angeles",
    sentiment: "negative",
    category: "service",
    rating: 2,
    comment: "The front desk staff was unhelpful.",
  },
  {
    id: 3,
    date: "2024-10-03",
    location: "Chicago",
    sentiment: "neutral",
    category: "amenities",
    rating: 3,
    comment: "The gym was fine but could use more equipment.",
  },
  {
    id: 4,
    date: "2024-10-04",
    location: "Miami",
    sentiment: "positive",
    category: "service",
    rating: 5,
    comment: "The staff went above and beyond!",
  },
  {
    id: 5,
    date: "2024-10-05",
    location: "London",
    sentiment: "negative",
    category: "cleanliness",
    rating: 1,
    comment: "There were stains on the sheets.",
  },
  {
    id: 6,
    date: "2024-10-06",
    location: "Paris",
    sentiment: "positive",
    category: "food",
    rating: 4,
    comment: "The breakfast options were amazing.",
  },
  {
    id: 7,
    date: "2024-10-07",
    location: "Tokyo",
    sentiment: "neutral",
    category: "service",
    rating: 3,
    comment: "The service was okay, nothing special.",
  },
  {
    id: 8,
    date: "2024-10-08",
    location: "Sydney",
    sentiment: "negative",
    category: "amenities",
    rating: 2,
    comment: "The pool was dirty and cold.",
  },
  {
    id: 9,
    date: "2024-10-09",
    location: "Berlin",
    sentiment: "positive",
    category: "location",
    rating: 5,
    comment: "Great location, close to all main attractions!",
  },
  {
    id: 10,
    date: "2024-10-10",
    location: "Rome",
    sentiment: "positive",
    category: "cleanliness",
    rating: 4,
    comment: "Very clean and well-maintained rooms.",
  },
  {
    id: 11,
    date: "2024-10-11",
    location: "Dubai",
    sentiment: "negative",
    category: "service",
    rating: 2,
    comment: "Slow service at check-in.",
  },
];
