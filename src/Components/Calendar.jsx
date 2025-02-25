import { useState } from "react";
import "./Calendar.css";

function Calendar() {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const monthOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentDate = new Date();

  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const firstdayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const preMonth = () => {
    setCurrentMonth((preMonth) => (preMonth === 0 ? 11 : preMonth - 1));
    setCurrentYear((preYear) => (currentMonth === 0 ? preYear - 1 : preYear));
  };

  const nextMonth = () => {
    setCurrentMonth((preMonth) => (preMonth === 11 ? 0 : preMonth + 1));
    setCurrentYear((preYear) => (currentMonth === 11 ? preYear + 1 : preYear));
  };

  return (
    <div className="calendar">
      <div className="navigate-date">
        <h2 className="month">{monthOfYear[currentMonth]},</h2>
        <h2 className="year">{currentYear}</h2>
        <div className="buttons">
          <i className="bx bx-chevron-left" onClick={preMonth}></i>
          <i className="bx bx-chevron-right" onClick={nextMonth}></i>
        </div>
      </div>
      <div className="weekdays">
        {daysOfWeek.map((day) => (
          <span key={day.id}>{day}</span>
        ))}
      </div>
      <div className="days">
        {[...Array(firstdayOfMonth).keys()].map((_, index) => (
          <span key={`empty-${index}`}></span>
        ))}
        {[...Array(daysInMonth).keys()].map((day) => (
          <span
            key={day + 1}
            className={
              day + 1 === currentDate.getDate() &&
              currentMonth === currentDate.getMonth() &&
              currentYear === currentDate.getFullYear()
                ? "current-day"
                : ""
            }
          >
            {day + 1}
          </span>
        ))}
      </div>
    </div>
  );
}
<span>1</span>;

export default Calendar;
