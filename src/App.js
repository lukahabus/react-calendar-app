import moment from 'moment';
import { getDaysInMonth } from './Calendar';
import './App.css';

function App() {
  const days = getDaysInMonth(moment());
  console.log(days);
  return (
    <h1>Calendar App</h1>
  );
}

export default App;
