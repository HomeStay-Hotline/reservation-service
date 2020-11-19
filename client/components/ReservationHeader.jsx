import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import styles from '../../public/styles/Reservation.css';

const ReservationHeader = (props) => {
  const { rate } = props;
  return (
    <div className={styles.header}>
      <div className={styles.ratePerNight}>
        <div className={styles.rate}>
          <span>
            <h1>
              {'$'}
              {rate}
              {' '}
            </h1>
          </span>
        </div>
        <div className={styles.night}>
          <span>
            <h3>/ night</h3>
          </span>
        </div>
      </div>
      <div className={styles.reviews}>
        <span>
          <FontAwesomeIcon icon={faStar} size="xs" className={styles.icon} />
        </span>
        <span>
          <h1>4.0</h1>
        </span>
        <span>
          <h3>(4)</h3>
        </span>
      </div>
    </div>
  );
};

ReservationHeader.propTypes = {
  rate: PropTypes.number.isRequired,
};

export default ReservationHeader;
