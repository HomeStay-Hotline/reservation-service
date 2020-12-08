/* eslint-disable class-methods-use-this */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKeyboard } from '@fortawesome/free-solid-svg-icons';
import CalendarBody from './CalendarBody';
import styles from '../../public/styles/calendar.css';
import staticCalendar from '../../generateStaticCalendar.js';

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
        console.log(data);
        setListing(data);
        let reserveDates = [];
        for (var i = 0; i < data.dates.length; i++) {
          let temp = {};
          temp.firstDate = new Date(data.dates[i].firstdate);
          temp.lastDate = new Date(data.dates[i].lastdate);
          reserveDates.push(temp);
        }
        return reserveDates;
      })
      .then((dates) => {
        const calendar = staticCalendar;
        for (let i = 0; i < dates.length; i++) {
          const tempStart = new Date(dates[i].firstDate);
          const tempEnd = new Date(dates[i].lastDate);
          const diffInMilliSeconds = Math.abs(tempEnd - tempStart) / 1000;
          const days = Math.floor(diffInMilliSeconds / 86400);
          const startRange = tempStart.getDate();
          let month;
          if (tempStart.getMonth() === 11) {
            month = 0;
          } else {
            month = tempStart.getMonth() + 1;
          }
          for (let j = startRange; j < startRange + days - 1; j++) {
            if (j > calendar[month].length) {
              const newIndex = j - calendar[month].length;
              let newMonth;
              if (month === 11) {
                newMonth = 0;
              } else {
                newMonth = month + 1;
              }
              calendar[newMonth][newIndex].available = false;
            } else {
              calendar[month][j].available = false;
            }
          }
        }
        setDates(calendar);
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
    <div className={styles.calendarFooter}>
      <div>
        <button type="submit" className={styles.calendarKeyboard}>
          <FontAwesomeIcon icon={faKeyboard} size="2x" />
        </button>
      </div>
      <div>
        <button type="submit" className={styles.calendarClear} onClick={clearDates}>Clear dates</button>
      </div>
    </div>
  );

  if (checkInClicked) {
    return (
      <div className={styles.calendarContainer}>
        <div className={styles.calendarHeader}>
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
          minDays={listing.minDays}
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
      <div className={styles.calendarContainer}>
        <div className={styles.calendarHeader}>
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
    <div className={styles.calendarContainer}>
      <div className={styles.calendarHeader}>
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
