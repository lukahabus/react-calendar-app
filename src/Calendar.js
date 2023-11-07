import moment from "moment";
import styled from "styled-components";
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

const CalendarCell = styled.div`
  border: 1px solid #eee;
  position: relative;
  height: 100%;

  :hover {
    background-color: #eee;
  }
`;

export const Calendar = ({ month, year, onPrev, onNext }) => {
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

          {weeks.map((week, index) => {
            const displayWeek =
              index === 0
                ? padWeekFront(week)
                : index === weeks.length - 1
                ? padWeekBack(week)
                : week;
            return (
              <CalendarRow key={index}>
                {displayWeek.map((dayMoment, j) => (
                  <CalendarCellWrap>
                    {dayMoment ? (
                      <CalendarCell key={dayMoment.format("D")}>
                        {dayMoment.format("D")}
                      </CalendarCell>
                    ) : (
                      <CalendarCell key={`${index}${j}`}></CalendarCell>
                    )}
                  </CalendarCellWrap>
                ))}
              </CalendarRow>
            );
          })}
        </CalendarTable>
      </CalendarTableWrap>
    </>
  );
};
