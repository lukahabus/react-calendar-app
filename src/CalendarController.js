import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import moment from "moment";
import { Calendar } from "./Calendar";
import { Modal } from "./Modal";
import { NewEventForm } from "./NewEventForm";

export const CalendarController = () => {
  const [events, setEvents] = useState([]);
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const { search } = useLocation();
  let navigate = useNavigate();
  const month = new URLSearchParams(search).get("m");
  const year = new URLSearchParams(search).get("y");

  const today = moment();

  const [currentMonthMoment, setCurrentMonthMoment] = useState(
    month && year ? moment(`${month}${year}`, "MMYYYY") : today
  );

  const incrementMonth = () => {
    const newMonth = moment(currentMonthMoment).add(1, "months");
    navigate(`/${newMonth.format("YYYY-MM")}`);
    setCurrentMonthMoment(newMonth);
  };

  const decrementMonth = () => {
    const newMonth = moment(currentMonthMoment).subtract(1, "months");
    navigate(`/${newMonth.format("YYYY-MM")}`);
    setCurrentMonthMoment(newMonth);
  };

  const createNewEvent = (name, time) => {
    setEvents(events.concat({ name, time, date: selectedDate }));
    setShowNewEventModal(false);
    setSelectedDate(null);
  };

  const displayModal = (date, month, year) => {
    console.log(date, month, year);
    setSelectedDate(moment(`${date}${month}${year}`, "DDMMYYYY"));
    setShowNewEventModal(true);
  };

  useEffect(() => {
    const path = window.location.pathname;
    const match = path.match(/\/(\d{4})-(\d{2})/);
    if (match) {
      const [, year, month] = match;
      setCurrentMonthMoment(moment(`${year}-${month}`, "YYYY-MM"));
    }
  }, [search]);

  return (
    <>
      <Modal
        shouldShow={showNewEventModal}
        onRequestClose={() => setShowNewEventModal(false)}
      >
        <h3>
          New Event for {selectedDate && selectedDate.format("DD/MM/YYYY")}
        </h3>
        <NewEventForm onSubmit={createNewEvent} />
      </Modal>
      <Calendar
        getCellProps={(dayMoment) => {
          const eventsForDay = events.filter((event) => {
            return dayMoment && event.date.isSame(dayMoment, "day");
          });
          return { events: eventsForDay };
        }}
        onCellClicked={displayModal}
        month={currentMonthMoment.format("MM")}
        year={currentMonthMoment.format("YYYY")}
        onPrev={decrementMonth}
        onNext={incrementMonth}
      />
    </>
  );
};
