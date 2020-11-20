import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ReservationHeader from './ReservationHeader';
import ReservationForm from './ReservationForm';
import styles from '../../public/styles/Reservation.css';

const Reservation = (props) => {
  const { listingID } = props;
  const [listing, setListing] = useState({});

  useEffect(() => {
    axios.get(`/api/homes/${listingID}/calendar`)
      .then(({ data }) => {
        delete data[0].dates;
        setListing(data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleGuestSelectClick = () => {
    console.log('clicked!');
  };

  if (Object.keys(listing).length === 0) {
    return (
      <div>Loading...</div>
    );
  }
  return (
    <div className={styles.container}>
      <ReservationHeader rate={listing.rate} />
      <ReservationForm handleGuestSelectClick={handleGuestSelectClick} />
      <div className={styles.btn}>
        <button type="submit" className={styles.reserve}>
          Check availability
        </button>
      </div>
    </div>
  );
};

Reservation.propTypes = {
  listingID: PropTypes.number.isRequired,
};

export default Reservation;
