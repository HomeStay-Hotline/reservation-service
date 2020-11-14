import React from 'react';

class CalendarHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="header-default">
        <h1>Select check-in date</h1>
        <h3>Add your travel dates for exact pricing</h3>
      </div>
    );
  }
}

export default CalendarHeader;
