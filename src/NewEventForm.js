import { useState } from "react";
import moment from "moment";

export const NewEventForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  return (
    <>
      <input
        placeholder="Event Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={() => onSubmit(name)}>Create Event</button>
    </>
  );
};
