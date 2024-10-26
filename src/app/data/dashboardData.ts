// data.ts

// Inquiry Interface
export interface Inquiry {
  id: number;
  title: string;
  count: number;
  percentage: number;
}

// Define LocationType as a union of specific keys
export type LocationType = "Property" | "Country" | "Continent" | "All";

// Sample Inquiry Data
export const inquiries: Inquiry[] = [
  { id: 1, title: "Reservation-Related Questions", count: 200, percentage: 78 },
  { id: 2, title: "Check-In and Check-Out", count: 200, percentage: 58 },
  { id: 3, title: "Room Information", count: 200, percentage: 26 },
  { id: 4, title: "Facilities", count: 200, percentage: 18 },
  { id: 5, title: "Dining Options", count: 200, percentage: 13 },
  { id: 6, title: "Reservation-Related Questions", count: 200, percentage: 10 },
  { id: 7, title: "Check-In and Check-Out", count: 200, percentage: 8 },
  { id: 8, title: "Room Information", count: 200, percentage: 6 },
  { id: 9, title: "Facilities", count: 200, percentage: 4 },
  { id: 10, title: "Dining Options", count: 200, percentage: 2 },
];

// Options for Time Dropdowns
export const timeOptions = {
  year: [
    { value: "Year", label: "Year" },
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
  ],
  month: [
    { value: "Month", label: "Month" },
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
  ],
  day: [
    { value: "Day", label: "Day" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
  ],
};

// Options for Location Dropdowns
export const locationOptions = {
  type: [
    { value: "All", label: "All" },
    { value: "Continent", label: "Continent" },
    { value: "Country", label: "Country" },
    { value: "Property", label: "Property" },
  ],
  specific: {
    Property: [
      { value: "Funan", label: "Funan" },
      { value: "Bugis", label: "Bugis" },
      { value: "One-North", label: "One-North" },
    ],
    Country: [
      { value: "Singapore", label: "Singapore" },
      { value: "Malaysia", label: "Malaysia" },
      { value: "Indonesia", label: "Indonesia" },
    ],
    Continent: [
      { value: "Asia", label: "Asia" },
      { value: "Europe", label: "Europe" },
      { value: "North America", label: "North America" },
    ],
    All: [{ value: "All Locations", label: "All Locations" }],
  } as Record<LocationType, { value: string; label: string }[]>, // Assertion to ensure types match
};
