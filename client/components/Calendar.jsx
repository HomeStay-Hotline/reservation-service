import React from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';

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
      </div>
    );
  }
}

export default Calendar;
