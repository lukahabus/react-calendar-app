import moment from 'moment';
import { segmentIntoWeeks, getDaysInMonth } from './Calendar';
import './App.css';

function App() {
  const weeks = segmentIntoWeeks(getDaysInMonth(moment()));
  console.log(weeks);
  return (
    <h1>Calendar App</h1>
  );
}

export default App;
