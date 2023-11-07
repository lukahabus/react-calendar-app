import styled from "styled-components";

const EventBox = styled.div`
    background-color: #eae9e9;
    border-radius: 4px;
    color: #009595;
    padding: 8px;
    margin-bottom: 4px;
`;

export const Event = ({ name, time }) => {
    return <EventBox>{name} - {time}</EventBox>;
};