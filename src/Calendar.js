import moment from "moment";
import styled from "styled-components";
import { CalendarCell } from "./CalendarCell";
import {
  getDaysInMonth,
  segmentIntoWeeks,
  daysOfTheWeek,
  padWeekFront,
  padWeekBack,
} from "./util";

const CalendarControlsWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15%;
  padding: 20px 0;
`;

const CalendarControls = styled.div`
  text-align: center;

  button {
    width: 100px;
    margin: 0 10px;
    padding: 5px 10px;
  }
`;

const CalendarTableWrap = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

const CalendarTable = styled.div`
  height: 85%;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CalendarRow = styled.div`
  display: flex;
  flex: 1;
`;

const CalendarHeading = styled.div`
  display: flex;
  flex-direction: row;
`;

const CalendarHeadingCell = styled.div`
  flex: 1;
  text-align: center;
`;

const CalendarCellWrap = styled.div`
  padding: 0px;
  flex: 1;
`;

export const Calendar = ({
    onCellClicked,
    month,
    year,
    onPrev,
    onNext,
    events,
  }) => {
    const currentMonthMoment = moment(`${month}${year}`, "MMYYYY");
    const weeks = segmentIntoWeeks(getDaysInMonth(currentMonthMoment));
  
    return (
      <>
        <CalendarTableWrap>
          <CalendarControlsWrap>
            <CalendarControls>
              <h1>{currentMonthMoment.format("MMMM YYYY")}</h1>
              <button onClick={onPrev}>Prev</button>
              <button onClick={onNext}>Next</button>
            </CalendarControls>
          </CalendarControlsWrap>
  
          <CalendarTable>
            <CalendarHeading>
              {daysOfTheWeek.map((day) => (
                <CalendarHeadingCell key={day}>{day}</CalendarHeadingCell>
              ))}
            </CalendarHeading>
  
            {weeks.map((week, i) => {
              const displayWeek =
                i === 0
                  ? padWeekFront(week)
                  : i === weeks.length - 1
                  ? padWeekBack(week)
                  : week;
              return (
                <CalendarRow key={i}>
                  {displayWeek.map((dayMoment, j) => {
                    const key = dayMoment ? dayMoment.format("DDMMYYYY") : `${i}-${j}`;
                    const eventsForDay = events.filter((event) =>
                      dayMoment && event.date.isSame(dayMoment, "day")
                    );
  
                    return ( // Added return statement here
                      <CalendarCellWrap
                        key={key} // Moved the key prop here
                        onClick={() =>
                          onCellClicked(
                            dayMoment.format("DD"),
                            dayMoment.format("MM"),
                            dayMoment.format("YYYY")
                          )
                        }
                      >
                        {dayMoment ? (
                          <CalendarCell
                            dateNumber={dayMoment.format("D")}
                            events={eventsForDay}
                          />
                        ) : (
                          <div /> // Replaced CalendarCell with div for empty cells
                        )}
                      </CalendarCellWrap>
                    );
                  })}
                </CalendarRow>
              );
            })}
          </CalendarTable>
        </CalendarTableWrap>
      </>
    );
  };