import { useState } from "react";
import moment from "moment";

export const getDaysInMonth = (monthMoment) => {
  const monthCopy = monthMoment.clone();
  monthCopy.startOf("month");

  let days = [];

  while (monthCopy.month() === monthMoment.month()) {
    days.push(monthCopy.clone());
    monthCopy.add(1, "days");
  }

  return days;
};

export const segmentIntoWeeks = (dayMoments) => {
  let weeks = [];
  let currentWeek = [];

  for (let day of dayMoments) {
    currentWeek.push(day.clone());
    if (day.format("dddd") === "Sunday") {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  return weeks;
};

const padWeekFront = (week, padWidth = null) => {
  return [...Array(7 - week.length).fill(padWidth), ...week];
};

const padWeekBack = (week, padWidth = null) => {
  return [...week, ...Array(7 - week.length).fill(padWidth)];
};

const daysOfTheWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const Calendar = () => {
  const today = moment();

  const [currentMonthMoment, setCurrentMonthMoment] = useState(today);

  const weeks = segmentIntoWeeks(getDaysInMonth(currentMonthMoment));

  const incrementMonth = () => {
    setCurrentMonthMoment(moment(currentMonthMoment.add(1, "months")));
  };

  const decrementMonth = () => {
    setCurrentMonthMoment(moment(currentMonthMoment.subtract(1, "months")));
  };

  return (
    <>
      <h1>{currentMonthMoment.format("MMMM YYYY")}</h1>
      <button onClick={decrementMonth}>Prev</button>
      <button onClick={incrementMonth}>Next</button>
      <table>
        <thead>
          <tr>
            {daysOfTheWeek.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, index) => {
            const displayWeek =
              index === 0
                ? padWeekFront(week)
                : index === weeks.length - 1
                ? padWeekBack(week)
                : week;
            return (
              <tr key={index}>
                {displayWeek.map((dayMoment, j) =>
                  dayMoment ? (
                    <td key={dayMoment.format("D")}>{dayMoment.format("D")}</td>
                  ) : (
                    <td key={`${index}${j}`}></td>
                  )
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
