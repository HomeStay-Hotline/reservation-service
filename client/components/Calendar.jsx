/* eslint-disable class-methods-use-this */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CalendarBody from './CalendarBody';
import styles from '../../public/styles/Calendar.css';

const Calendar = () => {
  const [listing, setListing] = useState({});
  const [dates, setDates] = useState([]);
  const [checkInDate, setCheckInDate] = useState({});
  const [checkInClicked, setcheckInClicked] = useState(false);

  // fetch dates data from the server
  // empty array as 2nd arg stops fetch from infinite loop
  useEffect(() => {
    axios.get('/api/homes/1/calendar')
      .then(({ data }) => {
        const months = ['November', 'December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'];
        const monthsWithDates = [];
        for (let i = 0; i < months.length; i += 1) {
          monthsWithDates.push(data[0].dates.filter((date) => date.month === months[i]));
        }
        setDates(monthsWithDates);
        delete data[0].dates;
        console.log(data[0]);
        setListing(data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const clearDates = () => {
    console.log('Clearing dates...');
  };

  const handleCheckInSelect = (date) => {
    console.log('Check-in date selected!', date);
    setcheckInClicked(true);
    setCheckInDate(date);
  };

  if (checkInClicked) {
    return (
      <div className="container">
        <div className={styles.header}>
          <h1>Select check-out date</h1>
          <h3>
            Minimum stay:
            {' '}
            {listing.minDays}
            {' '}
            nights
          </h3>
        </div>
        <CalendarBody
          dates={dates}
          checkInDate={checkInDate}
          checkInClicked={checkInClicked}
          listing={listing}
          handleCheckInSelect={handleCheckInSelect}
        />
        <div className={styles.footer}>
          <button type="submit" onClick={clearDates}>Clear dates</button>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <div className={styles.header}>
        <h1>Select check-in date</h1>
        <h3>Add your travel dates for exact pricing</h3>
      </div>
      <CalendarBody
        dates={dates}
        listing={listing}
        handleCheckInSelect={handleCheckInSelect}
      />
      <div className={styles.footer}>
        <button type="submit" onClick={clearDates}>Clear dates</button>
      </div>
    </div>
  );
};

export default Calendar;
