// data.ts

// Inquiry Interface
export interface Inquiry {
    id: number;
    title: string;
    count: number;
    percentage: number;
}

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
    },
};
