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

  if(currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  return weeks;
};
