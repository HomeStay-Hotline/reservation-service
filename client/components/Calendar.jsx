import React from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import CalendarFooter from './CalendarFooter';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="container">
        <CalendarHeader />
        <CalendarBody />
        <CalendarFooter />
      </div>
    );
  }
}

export default Calendar;
