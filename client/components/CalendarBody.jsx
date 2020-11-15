import React from 'react';
import Month from './Month';
import styles from '../../public/styles/calendar.css';

class CalendarBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonths: [],
    };
  }

  render() {
    return (
      <div className={styles.body}>
        <div>
          <Month month="November 2020" left />
        </div>
        <div>
          <Month month="December 2020" left={false} />
        </div>
      </div>
    );
  }
}

export default CalendarBody;
