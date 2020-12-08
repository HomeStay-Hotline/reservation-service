import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ReservationHeader from './ReservationHeader';
import ReservationForm from './ReservationForm';
import styles from '../../public/styles/Reservation.css';

const Reservation = (props) => {
  const { listingID } = props;
  const [listing, setListing] = useState(null);

  useEffect(() => {
    axios.get(`/api/homes${window.location.pathname}calendar`)
      .then(({ data }) => {
        // delete data[0].dates;
        setListing(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!listing) {
    return (
      <div>Loading...</div>
    );
  }
  return (
    <div className={styles.reservationContainer}>
      <ReservationHeader rate={listing.rate} />
      <ReservationForm />
      <div className={styles.reservationBtn}>
        <button type="submit" className={styles.reservationReserve}>
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
