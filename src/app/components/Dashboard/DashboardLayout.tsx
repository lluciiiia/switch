import React, { useState } from 'react';
import Draggable from 'react-draggable';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DashboardLayout = () => {
  // Track the active tab (either "dates" or "region")
  const [activeTab, setActiveTab] = useState('dates');

  // Load widget positions from localStorage if available
  const getInitialPosition = (widget: string) => {
    const savedPosition = localStorage.getItem(widget);
    return savedPosition ? JSON.parse(savedPosition) : { x: 0, y: 0 };
  };  

  // State to track the position of each widget
  const [calendarPosition, setCalendarPosition] = useState(getInitialPosition('calendarPosition'));
  const [inquiryPosition, setInquiryPosition] = useState(getInitialPosition('inquiryPosition'));

  // Function to save positions to localStorage
  const savePosition = (widget: string, position: { x: any; y: any; }) => {
    localStorage.setItem(widget, JSON.stringify(position));
  };

  // Handle widget dragging events
  const handleCalendarDrag = (e: any, data: { x: any; y: any; }) => {
    const newPosition = { x: data.x, y: data.y };
    setCalendarPosition(newPosition);
    savePosition('calendarPosition', newPosition);
  };

  const handleInquiryDrag = (e: any, data: { x: any; y: any; }) => {
    const newPosition = { x: data.x, y: data.y };
    setInquiryPosition(newPosition);
    savePosition('inquiryPosition', newPosition);
  };

  // Render the content for the "Dates" page with widgets
  const renderDatesContent = () => (
    <div className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden">
      {/* Draggable Calendar Widget */}
      <Draggable bounds="parent" position={calendarPosition} onStop={handleCalendarDrag}>
        <div className="bg-white p-6 rounded-lg shadow-lg w-full lg:w-1/3 xl:w-1/4 absolute">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-4 text-pink-500">July 2024</h2>
          <Calendar />
        </div>
      </Draggable>

      {/* Draggable Inquiry Ranking Widget */}
      <Draggable bounds="parent" position={inquiryPosition} onStop={handleInquiryDrag}>
        <div className="bg-white p-6 rounded-lg shadow-lg w-full lg:w-1/3 xl:w-1/4 absolute top-0 left-1/2">
          <h2 className="text-xl lg:text-2xl font-semibold mb-6 text-orange-500">Inquiry Ranking</h2>
          <ul className="space-y-4">
            <li className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
              <span className="flex items-center space-x-2">
                <span className="bg-orange-400 text-white font-bold py-1 px-3 rounded-full">1</span>
                <span>Reservation-Related Questions</span>
              </span>
              <span className="font-semibold text-gray-700">78%</span>
            </li>
            <li className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
              <span className="flex items-center space-x-2">
                <span className="bg-orange-400 text-white font-bold py-1 px-3 rounded-full">2</span>
                <span>Check-In and Check-Out</span>
              </span>
              <span className="font-semibold text-gray-700">58%</span>
            </li>
            <li className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
              <span className="flex items-center space-x-2">
                <span className="bg-orange-400 text-white font-bold py-1 px-3 rounded-full">3</span>
                <span>Room Information</span>
              </span>
              <span className="font-semibold text-gray-700">26%</span>
            </li>
            <li className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
              <span className="flex items-center space-x-2">
                <span className="bg-orange-400 text-white font-bold py-1 px-3 rounded-full">4</span>
                <span>Facilities</span>
              </span>
              <span className="font-semibold text-gray-700">18%</span>
            </li>
            <li className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
              <span className="flex items-center space-x-2">
                <span className="bg-orange-400 text-white font-bold py-1 px-3 rounded-full">5</span>
                <span>Dining Options</span>
              </span>
              <span className="font-semibold text-gray-700">13%</span>
            </li>
          </ul>
        </div>
      </Draggable>
    </div>
  );

  // Render the content for the "Region" page
  const renderRegionContent = () => (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Region Content</h2>
      {/* Add your region-related content here */}
      <p>This is the region content.</p>
    </div>
  );

  return (
    <div className="flex flex-col h-screen p-8 bg-gray-50">
      {/* Tabs for Date and Region */}
      <div className="mb-8 w-full flex space-x-4">
        <button
          className={`px-4 py-2 font-semibold rounded-lg ${activeTab === 'dates' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-600'}`}
          onClick={() => setActiveTab('dates')}
        >
          Dates
        </button>
        <button
          className={`px-4 py-2 font-semibold rounded-lg ${activeTab === 'region' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-600'}`}
          onClick={() => setActiveTab('region')}
        >
          Region
        </button>
      </div>

      {/* Conditionally Render Content Based on Active Tab */}
      <div className="w-full h-full">
        {activeTab === 'dates' ? renderDatesContent() : renderRegionContent()}
      </div>
    </div>
  );
};

export default DashboardLayout;
