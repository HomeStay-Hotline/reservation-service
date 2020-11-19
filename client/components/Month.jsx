/* eslint-disable no-plusplus */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styles from '../../public/styles/CalendarMonth.css';

const Month = (props) => {
  const {
    monthArr,
    checkInDate,
    checkInClicked,
    checkOutDate,
    checkOutClicked,
    left,
    handleCheckInSelect,
    handleCheckOutSelect,
  } = props;

  useEffect(() => {}, [monthArr, checkInClicked]);

  const tdTemplate = (style, isDisabled, onClick, date) => {
    if (isDisabled) {
      return (
        <td>
          <button
            className={style}
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
      <tbody className={styles.monthBody}>
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
                return tdTemplate(styles.notAvailable, true, null, dates[currDate++]);
              }
              const dateNumber = parseInt(date.date, 10);
              // const minStayDate = parseInt(date.date, 10) + listing.minDays;
              const checkInDateNum = parseInt(checkInDate.date, 10);
              if (checkInClicked) {
                // if the current date is behind the checkInDate, disable the button
                // (can't select a checkout date that's in the past)
                if ((date.month === checkInDate.month
                    && dateNumber < checkInDateNum)
                    || (date.month !== checkInDate.month && left)) {
                  return tdTemplate(styles.notAvailable, true, null, dates[currDate++]);
                }
                if (_.isEqual(dates[currDate], checkInDate)) {
                  return tdTemplate(styles.checkIn, false, null, dates[currDate++]);
                }
                return tdTemplate(styles.available, false, handleCheckOutSelect, dates[currDate++]);
              }
              if (checkOutClicked) {
                if ((date.month === checkInDate.month
                  && dateNumber < checkInDateNum)
                  || (date.month !== checkInDate.month && left)) {
                  return tdTemplate(styles.notAvailable, true, null, dates[currDate++]);
                }
                if (_.isEqual(dates[currDate], checkInDate)) {
                  return tdTemplate(styles.checkIn, false, null, dates[currDate++]);
                }
                if (_.isEqual(dates[currDate], checkOutDate)) {
                  return tdTemplate(styles.checkOut, false, null, dates[currDate++]);
                }
                return tdTemplate(styles.notAvailable, true, null, dates[currDate++]);
              }
              return tdTemplate(styles.available, false, handleCheckInSelect, dates[currDate++]);
            })}
          </tr>
        ))}
      </tbody>
    );
  };

  if (monthArr.length === 0) {
    return <div>Loading...</div>;
  }
  const monthHeader = left
    ? (
      <div className={styles.monthHeaderLeft}>
        <span>
          <button type="submit">&lt;</button>
        </span>
        <span>{`${monthArr[0].month} ${monthArr[0].year}`}</span>
      </div>
    )
    : (
      <div className={styles.monthHeaderRight}>
        <span>{`${monthArr[0].month} ${monthArr[0].year}`}</span>
        <span>
          <button type="submit">&gt;</button>
        </span>
      </div>
    );
  return (
    <div key={`${monthArr[0].month} ${monthArr[0].year}`} className={styles.monthContainer}>
      {monthHeader}
      <table>
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
  left: PropTypes.bool,
  handleCheckInSelect: PropTypes.func,
  handleCheckOutSelect: PropTypes.func,
};

Month.defaultProps = {
  monthArr: [],
  checkInClicked: false,
  checkInDate: {},
  checkOutClicked: false,
  checkOutDate: {},
  left: false,
  handleCheckInSelect: null,
  handleCheckOutSelect: null,
};

export default Month;
