import React, { useState } from "react";
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isSameDay,
} from "date-fns";

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date();

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const renderHeader = () => (
    <div className="flex items-center justify-between px-4 py-2">
      <h2 className="text-lg font-semibold text-orange-500">
        {format(currentMonth, "MMMM yyyy")}
      </h2>
      <div className="space-x-4">
        <button
          onClick={handlePrevMonth}
          className="text-gray-500 hover:text-orange-500"
        >
          &lt;
        </button>
        <button
          onClick={handleNextMonth}
          className="text-gray-500 hover:text-orange-500"
        >
          &gt;
        </button>
      </div>
    </div>
  );

  const renderDays = () => {
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return (
      <div className="grid grid-cols-7 text-center text-gray-500 border-b pb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="uppercase text-xs font-medium">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isToday = isSameDay(day, today);

        days.push(
          <div
            key={day.toString()}
            className={`p-2 text-center ${
              isCurrentMonth ? "text-gray-800" : "text-gray-400"
            } ${isToday ? "bg-orange-500 text-white rounded-full" : ""}`}
          >
            <span>{format(day, "dd")}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }

    return <div className="mt-2">{rows}</div>;
  };

  return (
    <div className="w-full p-4 bg-white rounded-xl shadow-md">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
