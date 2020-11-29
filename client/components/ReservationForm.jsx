import React, { useState } from 'react';
import styles from '../../public/styles/Reservation.css';

const ReservationForm = (props) => {
  const [guestClicked, setGuestClicked] = useState(false);

  const handleGuestSelectClick = () => {
    setGuestClicked(true);
  };

  return (
    <div>

      <table className={styles.reservationFormWrapper}>
        <tbody>
          <tr>
            <td className={styles.reservationFormInput}>
              <div>
                <label htmlFor="checkin">
                  CHECK-IN
                </label>
                <input type="text" id="checkin" placeholder="Add date" className={styles.reservationCheckInOut} />
              </div>
            </td>
            <td className={styles.reservationFormInput}>
              <div>
                <label htmlFor="checkin">
                  CHECKOUT
                </label>
                <input type="text" id="checkout" placeholder="Add date" className={styles.reservationCheckInOut} />
              </div>
            </td>
          </tr>
          <tr className={styles.reservationGuestSelect}>
            <td>
              <div>
                <label htmlFor="checkin">
                  GUESTS
                </label>
                <input type="text" id="guests" value="1 guest" readOnly className={styles.reservationGuest} />
              </div>
            </td>
            <td onClick={handleGuestSelectClick}>
              <div className={styles.reservationArrowDown}>
                &#8964;
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ReservationForm;
