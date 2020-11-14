import React from 'react';

class CalendarBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="month">
          Month 1
        </div>
        <div className="month">
          Month 2
        </div>
      </div>
    );
  }
}

export default CalendarBody;
