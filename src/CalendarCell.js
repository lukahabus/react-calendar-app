import styled from "styled-components";
import { Event } from "./Event";

const Cell = styled.div`
  border: 1px solid #eee;
  position: relative;
  height: 100%;

  &:hover {
    background-color: #eee;
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


export const CalendarCell = ({ dateNumber = '', events = [] }) => {
    if(dateNumber === '') {
        return <EmptyCell />
    }
    return (
        <Cell>
            <DateNumber>{dateNumber}</DateNumber>
            {events.map(event => <Event key={event.name} name={event.name} time={event.time} />)}
        </Cell>
    )
}