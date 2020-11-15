import React from 'react';
import Month from './Month';
import styles from '../../public/styles/calendar.css';

class CalendarBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonths: ['November 2020', 'December 2020'],
    };
  }

  render() {
    const { currentMonths } = this.state;
    return (
      <div className={styles.body}>
        <div>
          <Month month={currentMonths[0]} left />
        </div>
        <div>
          <Month month={currentMonths[1]} left={false} />
        </div>
      </div>
    );
  }
}

export default CalendarBody;
