/* eslint-disable no-plusplus */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styles from '../../public/styles/CalendarMonth.css';

const Month = (props) => {
  const { monthArr, checkInClicked, checkInDate, listing, left, handleCheckInSelect } = props;

  useEffect(() => {}, [monthArr, checkInClicked]);

  // Dynamically renders a table of dates according to the month
  const makeDatesTable = (dates) => {
    const months = ['November', 'December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weeks = [1, 2, 3, 4, 5];
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
            // if the current week is week 1 AND the dayIndex is less than the startIndex,
            // OR dates at the currDate index is undefined
              if ((dayIndex < startIndex && wkIndex === 0) || !dates[currDate]) {
                return <td />;
              }
              // if dates at the currDate is unavailable
              if (!dates[currDate].available) {
                return (
                  <td>
                    <button
                      className={styles.notAvailable}
                      type="submit"
                      disabled
                    >
                      {dates[currDate++].date}
                    </button>
                  </td>
                );
              }
              const date = dates[currDate];
              if (checkInClicked) {
                // if the current date is behind the checkInDate, disable the button
                // (can't select a checkout date that's in the past)
                const dateNumber = parseInt(date.date, 10);
                if ((date.month === checkInDate.month
                    && dateNumber < parseInt(checkInDate.date, 10))
                    || (date.month !== checkInDate.month && left)) {
                  return (
                    <td>
                      <button
                        className={styles.notAvailable}
                        type="submit"
                        disabled
                      >
                        {dates[currDate++].date}
                      </button>
                    </td>
                  );
                }
                if (_.isEqual(dates[currDate], checkInDate)) {
                  return (
                    <td>
                      <button
                        className={styles.checkIn}
                        type="submit"
                      >
                        {dates[currDate++].date}
                      </button>
                    </td>
                  );
                }
              }
              return (
                <td>
                  <button
                    className={styles.available}
                    type="submit"
                    onClick={() => {
                      handleCheckInSelect(date);
                    }}
                  >
                    {dates[currDate++].date}
                  </button>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    );
  };

  if (monthArr.length === 0) {
    return <div>Loading...</div>;
  }
  console.log(`Check in date inside ${monthArr[0].month}: `, checkInDate);
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
    <div className={styles.monthContainer}>
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
  checkOutDate: PropTypes.shape({
    dayOfWeek: PropTypes.string,
    month: PropTypes.string,
    date: PropTypes.string,
    year: PropTypes.string,
    available: PropTypes.bool,
  }),
  listing: PropTypes.shape({
    listing_ID: PropTypes.number,
    name: PropTypes.string,
    maxGuests: PropTypes.number,
    minDays: PropTypes.number,
    rate: PropTypes.number,
    cleaningFee: PropTypes.number,
    serviceFee: PropTypes.number,
  }),
  left: PropTypes.bool,
  handleCheckInSelect: PropTypes.func.isRequired,
};

Month.defaultProps = {
  monthArr: [],
  listing: {},
  checkInClicked: false,
  checkInDate: {},
  checkOutDate: {},
  left: false,
};

export default Month;
