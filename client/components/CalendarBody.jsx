import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Month from './Month';
import styles from '../../public/styles/CalendarBody.css';

const CalendarBody = (props) => {
  const {
    dates,
    checkInDate,
    checkInClicked,
    checkOutDate,
    checkOutClicked,
    listing,
    handleCheckInSelect,
    handleCheckOutSelect,
  } = props;
  // const handleLeftRightToggle = () => null;
  useEffect(() => {}, [checkInDate]);
  return (
    <div className={styles.body}>
      <div className={styles.bodyLeft}>
        <Month
          monthArr={dates[0]}
          listing={listing}
          checkInDate={checkInDate}
          checkInClicked={checkInClicked}
          checkOutDate={checkOutDate}
          checkOutClicked={checkOutClicked}
          left
          handleCheckInSelect={handleCheckInSelect}
          handleCheckOutSelect={handleCheckOutSelect}
        />
      </div>
      <div className={styles.bodyRight}>
        <Month
          monthArr={dates[1]}
          listing={listing}
          checkInDate={checkInDate}
          checkInClicked={checkInClicked}
          checkOutDate={checkOutDate}
          checkOutClicked={checkOutClicked}
          handleCheckInSelect={handleCheckInSelect}
          handleCheckOutSelect={handleCheckOutSelect}
        />
      </div>
    </div>
  );
};

CalendarBody.propTypes = {
  dates: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
    dayOfWeek: PropTypes.string.isRequired,
    month: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    available: PropTypes.bool.isRequired,
  }))).isRequired,
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
  listing: PropTypes.shape({
    listing_ID: PropTypes.number,
    name: PropTypes.string,
    maxGuests: PropTypes.number,
    minDays: PropTypes.number,
    rate: PropTypes.number,
    cleaningFee: PropTypes.number,
    serviceFee: PropTypes.number,
  }),
  handleCheckInSelect: PropTypes.func,
  handleCheckOutSelect: PropTypes.func,
};

CalendarBody.defaultProps = {
  listing: {},
  checkInClicked: false,
  checkInDate: {},
  checkOutClicked: false,
  checkOutDate: {},
  handleCheckInSelect: null,
  handleCheckOutSelect: null,
};

export default CalendarBody;
