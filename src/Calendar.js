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
  justify-content: space-between;
  align-items: center;
  height: 10%;
  padding: 20px 0;
`;

const MonthDisplay = styled.div`
  text-align: left;
`;

const ButtonGroup = styled.div`
  text-align: right;

  button {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    color: #009595;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    background-color: white;
    border: 2px solid #dff4f4;
    cursor: pointer;

    &:hover {
      background-color: #dff4f4;
      color: #009595;
      border: 2px solid #009595;
      cursor: pointer;
      transition: 0.2s ease-in-out;
      transform: scale(1.05);
      outline: none;
      font-weight: bold;
    }
  }

  button:last-child {
    margin-right: 0;
  }
`;

const CalendarTableWrap = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin-left: 20px;
  margin-right: 20px;
`;

const CalendarTable = styled.div`
  height: 80%;
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
  background-color: #e5f6f6;
  height: 10%;
  align-items: center;
`;

const CalendarHeadingCell = styled.div`
  flex: 1;
  text-align: center;
  color: #009595;
  font-weight: bold;
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
  getCellProps,
}) => {
  const currentMonthMoment = moment(`${month}${year}`, "MMYYYY");
  const weeks = segmentIntoWeeks(getDaysInMonth(currentMonthMoment));

  return (
    <>
      <CalendarTableWrap>
        <CalendarControlsWrap>
          <MonthDisplay>
            <h1>{currentMonthMoment.format("MMMM YYYY")}</h1>
          </MonthDisplay>
          <ButtonGroup>
            <button onClick={onPrev}>&lt;</button>
            <button onClick={onNext}>&gt;</button>
          </ButtonGroup>
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
                  const key = dayMoment
                    ? dayMoment.format("DDMMYYYY")
                    : `${i}-${j}`;

                  return (
                    <CalendarCellWrap
                      key={key}
                      onClick={() => {
                        if (dayMoment) {
                          onCellClicked(
                            dayMoment.format("DD"),
                            dayMoment.format("MM"),
                            dayMoment.format("YYYY")
                          );
                        }
                      }}
                    >
                      {dayMoment ? (
                        <CalendarCell
                          dateNumber={dayMoment.format("D")}
                          {...getCellProps(dayMoment)}
                          key={dayMoment.format("D")}
                        />
                      ) : (
                        <CalendarCell />
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
