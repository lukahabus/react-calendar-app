import { useState } from "react";
import moment from "moment";

export const NewEventForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  return (
    <>
      <input
        placeholder="Event Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
      placeholder="i.e. 5:00PM"
      value={time}
      onChange={e => setTime(e.target.value)}
      />
      <button onClick={() => onSubmit(name, time)}>Create Event</button>
    </>
  );
};
