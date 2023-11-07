import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CalendarController } from "./CalendarController";
import React from 'react';
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CalendarController />} />
        <Route path="/:year-:month" element={<CalendarController />} />
        <Route path="*" element={<CalendarController />} />
      </Routes>
    </Router>
  );
}

export default App;
