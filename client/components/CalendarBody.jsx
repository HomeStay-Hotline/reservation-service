import React from 'react';
import PropTypes from 'prop-types';
import Month from './Month';
import styles from '../../public/styles/CalendarBody.css';

const CalendarBody = (props) => {
  const { dates } = props;
  // const handleLeftRightToggle = () => null;
  return (
    <div className={styles.body}>
      <div className={styles.bodyLeft}>
        <Month monthArr={dates[0]} left />
      </div>
      <div className={styles.bodyRight}>
        <Month monthArr={dates[1]} />
      </div>
    </div>
  );
};

// Set dates' propType to be an array of arrays containing date objects of the described shape
CalendarBody.propTypes = {
  dates: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
    dayOfWeek: PropTypes.string.isRequired,
    month: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    available: PropTypes.bool.isRequired,
  }))).isRequired,
};

export default CalendarBody;
