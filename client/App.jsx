import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './components/Calendar';
import Reservation from './components/Reservation';
import styles from '../public/styles/App.css';

const App = () => (
  <div className={styles.container}>
    <div className="calendar">
      <Calendar />
    </div>
    <div className="reservation">
      <Reservation />
    </div>
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
