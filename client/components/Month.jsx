/* eslint-disable max-len */
/* eslint-disable no-plusplus */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styles from '../../public/styles/CalendarMonth.css';

const Month = (props) => {
  const {
    monthArr,
    minDays,
    checkInDate,
    checkInClicked,
    checkOutDate,
    checkOutClicked,
    handleCheckInSelect,
    handleCheckOutSelect,
  } = props;

 
  useEffect(() => {}, [monthArr, checkInClicked]);

  const tdTemplate = (style, isDisabled, onClick, date) => {
    if (isDisabled) {
      return (
        <td className={style}>
          <button
            type="submit"
            disabled
          >
            {date.date}
          </button>
        </td>
      );
    }
    return (
      <td className={style}>
        <button
          type="submit"
          onClick={() => {
            onClick(date);
          }}
        >
          {date.date}
        </button>
      </td>
    );
  };

  // Dynamically renders a table of dates according to the month
  const makeDatesTable = (dates) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weeks = [1, 2, 3, 4, 5, 6];
    let currDate = 0;
    const startIndex = days.indexOf(dates[0].dayOfWeek);
    return (
      <tbody className={styles.calendarMonthBody}>
        <tr>
          {days.map((day) => <td>{day.slice(0, 2)}</td>)}
        </tr>
        {/* for each week */}
        {weeks.map((week, wkIndex) => (
          <tr>
            {/* for each day of the week */}
            {days.map((day, dayIndex) => {
              const date = dates[currDate];
              // if the current week is week 1 AND the dayIndex is less than the startIndex,
              // OR dates at the currDate index is undefined
              if ((dayIndex < startIndex && wkIndex === 0) || !dates[currDate]) {
                return <td />;
              }
              // if dates at the currDate is unavailable
              if (!dates[currDate].available) {
                return tdTemplate(styles.calendarMonthUnavailable, true, null, dates[currDate++]);
              }
              if (checkInClicked) {
                // if the current date is behind the checkInDate, disable the button
                // (can't select a checkout date that's in the past)
                const currentDate = new Date(`${date.month} ${date.date} ${date.year}`);
                const checkInToDate = new Date(`${checkInDate.month} ${checkInDate.date} ${checkInDate.year}`);
                const daysDiff = Math.floor(((Date.parse(currentDate) - Date.parse(checkInToDate)) / 86400000));
                if (currentDate < checkInToDate) {
                  return tdTemplate(styles.calendarMonthUnavailable, true, null, dates[currDate++]);
                }
                if (currentDate > checkInToDate && daysDiff < minDays) {
                  return tdTemplate(styles.calendarMonthMinDays, true, null, dates[currDate++]);
                }
                if (_.isEqual(dates[currDate], checkInDate)) {
                  return tdTemplate(styles.calendarMonthCheckIn, false, null, dates[currDate++]);
                }
                return tdTemplate(styles.calendarMonthAvailable, false, handleCheckOutSelect, dates[currDate++]);
              }
              if (checkOutClicked) {
                const currentDate = new Date(`${date.month} ${date.date} ${date.year}`);
                const checkInToDate = new Date(`${checkInDate.month} ${checkInDate.date} ${checkInDate.year}`);
                const checkOutToDate = new Date(`${checkOutDate.month} ${checkOutDate.date} ${checkOutDate.year}`);
                if (currentDate < checkInToDate) {
                  return tdTemplate(styles.calendarMonthUnavailable, true, null, dates[currDate++]);
                }
                if (currentDate > checkInToDate && currentDate < checkOutToDate) {
                  return tdTemplate(styles.daysBetween, true, null, dates[currDate++]);
                }
                if (_.isEqual(dates[currDate], checkInDate)) {
                  return tdTemplate(styles.calendarMonthCheckIn, false, null, dates[currDate++]);
                }
                if (_.isEqual(dates[currDate], checkOutDate)) {
                  return tdTemplate(styles.calendarMonthCheckOut, false, null, dates[currDate++]);
                }
                if (currentDate > checkOutToDate) {
                  return tdTemplate(styles.calendarMonthAvailable, false, handleCheckInSelect, dates[currDate++]);
                }
                return tdTemplate(styles.calendarMonthUnavailable, true, null, dates[currDate++]);
              }
              return tdTemplate(styles.calendarMonthAvailable, false, handleCheckInSelect, dates[currDate++]);
            })}
          </tr>
        ))}
      </tbody>
    );
  };

  if (monthArr.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div key={`${monthArr[0].month} ${monthArr[0].year}`} className={styles.calendarMonthContainer}>
      <table>
        <thead className={styles.calendarMonthHeader}>
          <tr>
            <th colSpan="7">{`${monthArr[0].month} ${monthArr[0].year}`}</th>
          </tr>
        </thead>
        {makeDatesTable(monthArr)}
      </table>
    </div>
  );
};

Month.propTypes = {
  monthArr: PropTypes.arrayOf(PropTypes.shape({
    dayOfWeek: PropTypes.string.isRequired,
    month: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    available: PropTypes.bool.isRequired,
  })),
  minDays: PropTypes.number,
  checkInClicked: PropTypes.bool,
  checkInDate: PropTypes.shape({
    dayOfWeek: PropTypes.string,
    month: PropTypes.string,
    date: PropTypes.string,
    year: PropTypes.string,
    available: PropTypes.bool,
  }),
  checkOutClicked: PropTypes.bool,
  checkOutDate: PropTypes.shape({
    dayOfWeek: PropTypes.string,
    month: PropTypes.string,
    date: PropTypes.string,
    year: PropTypes.string,
    available: PropTypes.bool,
  }),
  handleCheckInSelect: PropTypes.func,
  handleCheckOutSelect: PropTypes.func,
};

Month.defaultProps = {
  monthArr: [],
  minDays: 0,
  checkInClicked: false,
  checkInDate: {},
  checkOutClicked: false,
  checkOutDate: {},
  handleCheckInSelect: null,
  handleCheckOutSelect: null,
};

export default Month;
