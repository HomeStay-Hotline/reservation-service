/* eslint-disable no-plusplus */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../../public/styles/CalendarMonth.css';

// Dynamically renders a table of dates according to the month
const makeDatesTable = (dates, checkInClicked, handleCheckInSelect) => {
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

const Month = (props) => {
  const { monthArr, checkInClicked, left, handleCheckInSelect } = props;
  useEffect(() => {}, [monthArr, checkInClicked]);
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
    <div className={styles.monthContainer}>
      {monthHeader}
      <table>
        {makeDatesTable(monthArr, checkInClicked, handleCheckInSelect)}
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
  left: PropTypes.bool,
  checkInClicked: PropTypes.bool,
  handleCheckInSelect: PropTypes.func.isRequired,
};

Month.defaultProps = {
  monthArr: [],
  checkInClicked: false,
  left: false,
};

export default Month;
