/* eslint-disable class-methods-use-this */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKeyboard } from '@fortawesome/free-solid-svg-icons';
import CalendarBody from './CalendarBody';
import styles from '../../public/styles/calendar.css';

const Calendar = () => {
  const [listing, setListing] = useState({});
  const [dates, setDates] = useState([]);
  const [checkInDate, setCheckInDate] = useState({});
  const [checkInClicked, setCheckInClicked] = useState(false);
  const [checkOutDate, setCheckOutDate] = useState({});
  const [checkOutClicked, setCheckOutClicked] = useState(false);

  // fetch dates data from the server
  // empty array as 2nd arg stops fetch from infinite loop
  useEffect(() => {
    axios.get(`/api/homes${window.location.pathname}calendar`)
      .then(({ data }) => {
        const months = ['November', 'December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'];
        const monthsWithDates = [];
        for (let i = 0; i < months.length; i += 1) {
          monthsWithDates.push(data[0].dates.filter((dt) => dt.month === months[i]));
        }
        setDates(monthsWithDates);
        delete data[0].dates;
        setListing(data[0]);
      })
      .catch((serverErr) => {
        console.log(serverErr);
      });
  }, []);

  const clearDates = () => {
    setCheckInClicked(false);
    setCheckOutClicked(false);
  };

  const handleCheckInSelect = (date) => {
    setCheckInDate(date);
    setCheckInClicked(true);
  };

  const handleCheckOutSelect = (date) => {
    setCheckInClicked(false);
    setCheckOutDate(date);
    setCheckOutClicked(true);
  };

  const footer = (
    <div className={styles.footer}>
      <div>
        <button type="submit" className={styles.keyboard}>
          <FontAwesomeIcon icon={faKeyboard} size="2x" />
        </button>
      </div>
      <div>
        <button type="submit" className={styles.clear} onClick={clearDates}>Clear dates</button>
      </div>
    </div>
  );

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
          handleCheckOutSelect={handleCheckOutSelect}
        />
        {footer}
      </div>
    );
  }
  if (checkOutClicked) {
    const checkInStr = `${checkInDate.month} ${checkInDate.date} ${checkInDate.year}`;
    const checkOutStr = `${checkOutDate.month} ${checkOutDate.date} ${checkOutDate.year}`;
    const dayDiff = Math.floor((Date.parse(checkOutStr) - Date.parse(checkInStr)) / 86400000);
    return (
      <div className="container">
        <div className={styles.header}>
          <h1>
            {dayDiff}
            {' '}
            nights in
            {' '}
            {listing.name}
          </h1>
          <h3>
            {checkInDate.month.slice(0, 3)}
            {' '}
            {checkInDate.date}
            {', '}
            {checkInDate.year}
            {' - '}
            {checkOutDate.month.slice(0, 3)}
            {' '}
            {checkOutDate.date}
            {', '}
            {checkOutDate.year}
          </h3>
        </div>
        <CalendarBody
          dates={dates}
          checkInDate={checkInDate}
          checkInClicked={checkInClicked}
          checkOutDate={checkOutDate}
          checkOutClicked={checkOutClicked}
        />
        {footer}
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
        handleCheckInSelect={handleCheckInSelect}
      />
      {footer}
    </div>
  );
};

export default Calendar;
