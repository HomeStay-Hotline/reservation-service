import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../public/styles/Reservation.css';

const Reservation = () => {
  const [listing, setListing] = useState({});

  useEffect(() => {
    axios.get('/api/homes/1/calendar')
      .then(({ data }) => {
        delete data[0].dates;
        setListing(data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (Object.keys(listing).length === 0) {
    return (
      <div>Loading...</div>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.ratePerNight}>
          <div className={styles.rate}>
            <span>
              <h1>
                {'$'}
                {listing.rate}
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
      </div>
    </div>
  );
};

export default Reservation;
