import { feedbackData } from "@/app/data/feedbackData";
import React, { useState } from "react";

interface Feedback {
  id: number;
  date: string;
  location: string;
  sentiment: string;
  category: string;
  rating: number;
  comment: string;
}

const Feedback: React.FC = () => {
  const [filteredSentiment, setFilteredSentiment] = useState("all");
  const [filteredLocation, setFilteredLocation] = useState("all");
  const [filteredDate, setFilteredDate] = useState("");

  const filterBySentiment = (sentiment: string) => {
    setFilteredSentiment(sentiment);
  };

  const filterByLocation = (location: string) => {
    setFilteredLocation(location);
  };

  const filterByDate = (date: string) => {
    setFilteredDate(date);
  };

  const filteredFeedbackData = feedbackData.filter((feedback) => {
    const sentimentMatch =
      filteredSentiment === "all" || feedback.sentiment === filteredSentiment;
    const locationMatch =
      filteredLocation === "all" || feedback.location === filteredLocation;
    const dateMatch = !filteredDate || feedback.date === filteredDate;

    return sentimentMatch && locationMatch && dateMatch;
  });

  const uniqueLocations = Array.from(
    new Set(feedbackData.map((feedback) => feedback.location))
  );

  return (
    <div className="p-6 bg-gray-100 h-full">
      <div className="grid grid-cols-3 gap-4 mb-6 text-center w-[750px]">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Total Feedback</h2>
          <p className="text-2xl font-bold">{feedbackData.length}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Positive Feedback</h2>
          <p className="text-2xl font-bold">
            {
              feedbackData.filter((item) => item.sentiment === "positive")
                .length
            }
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Negative Feedback</h2>
          <p className="text-2xl font-bold">
            {
              feedbackData.filter((item) => item.sentiment === "negative")
                .length
            }
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex space-x-4 mb-6">
        <select
          onChange={(e) => filterBySentiment(e.target.value)}
          value={filteredSentiment}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All</option>
          <option value="positive">Positive</option>
          <option value="negative">Negative</option>
          <option value="neutral">Neutral</option>
        </select>

        <select
          onChange={(e) => filterByLocation(e.target.value)}
          value={filteredLocation}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Locations</option>
          {uniqueLocations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>

        <input
          type="date"
          onChange={(e) => filterByDate(e.target.value)}
          value={filteredDate}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Feedback List */}
      <div className="bg-white p-4 rounded-lg shadow-md overflow-y-auto h-[380px] custom-scrollbar">
        <h2 className="text-lg font-bold mb-4">Feedback List</h2>
        <ul className="space-y-4">
          {filteredFeedbackData.map((feedback) => (
            <li key={feedback.id} className="p-4 border-b border-gray-200">
              <p>
                <strong>Date:</strong> {feedback.date}
              </p>
              <p>
                <strong>Location:</strong> {feedback.location}
              </p>
              <p>
                <strong>Rating:</strong> &nbsp;
                {Array.from({ length: feedback.rating }).map((_, index) => (
                  <span key={index} className="text-yellow-500">
                    ⭐
                  </span>
                ))}
              </p>
              <p>
                <strong>Comment:</strong> {feedback.comment}
              </p>
              <p
                className={`${
                  feedback.sentiment === "positive"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                <strong>Sentiment:</strong> {feedback.sentiment}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Feedback;
