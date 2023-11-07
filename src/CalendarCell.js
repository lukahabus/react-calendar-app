import styled from "styled-components";
import { Event } from "./Event";

const Cell = styled.div`
  border: 1px solid #eee;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const EmptyCell = styled.div`
  border: 1px solid #eee;
  position: relative;
  height: 100%;
`;

const DateNumber = styled.div`
  position: absolute;
  top: 5px;  
  right: 5px; 
  background-color: #eee; 
  color: black; 
  border-radius: 50%; 
  padding: 5px; 
  width: 20px; 
  height: 20px; 
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const EventContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 5px;
`;

export const CalendarCell = ({ dateNumber = '', events = [] }) => {
  if (dateNumber === '') {
    return <EmptyCell />;
  }
  return (
    <Cell>
      <DateNumber>{dateNumber}</DateNumber>
      <EventContainer>
        {events.map((event, index) => (
          <Event key={index} name={event.name} time={event.time} />
        ))}
      </EventContainer>
    </Cell>
  );
};
