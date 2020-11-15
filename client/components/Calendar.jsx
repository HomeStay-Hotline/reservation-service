/* eslint-disable class-methods-use-this */
import React from 'react';
import axios from 'axios';
import CalendarBody from './CalendarBody';
import styles from '../../public/styles/calendar.css';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: [],
    };
  }

  componentDidMount() {
    axios.get('/api/homes/1/calendar')
      .then(({ data }) => {
        this.setState({
          dates: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  clearDates() {
    console.log('Clearing dates...');
  }

  render() {
    const { dates } = this.state;
    return (
      <div className="container">
        <div className={styles.header}>
          <h1>Select check-in date</h1>
          <h3>Add your travel dates for exact pricing</h3>
        </div>
        <CalendarBody dates={dates} />
        <div className={styles.footer}>
          <button type="submit" onClick={this.clearDates.bind(this)}>Clear dates</button>
        </div>
      </div>
    );
  }
}

export default Calendar;
