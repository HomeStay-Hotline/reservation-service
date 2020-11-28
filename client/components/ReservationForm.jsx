import React, { useState } from 'react';
import styles from '../../public/styles/Reservation.css';

const ReservationForm = (props) => {
  const [guestClicked, setGuestClicked] = useState(false);

  const handleGuestSelectClick = () => {
    setGuestClicked(true);
  };

  let guestSelect;
  if (guestClicked) {
    guestSelect = (
      <div className={styles.guestSelect}>
        hey lol
      </div>
    );
  }
  return (
    <div>

      <table className={styles.formWrapper}>
        <tbody>
          <tr>
            <td className={styles.formInput}>
              <div>
                <label htmlFor="checkin">
                  CHECK-IN
                </label>
                <input type="text" id="checkin" placeholder="Add date" className={styles.checkInOut} />
              </div>
            </td>
            <td className={styles.formInput}>
              <div>
                <label htmlFor="checkin">
                  CHECKOUT
                </label>
                <input type="text" id="checkout" placeholder="Add date" className={styles.checkInOut} />
              </div>
            </td>
          </tr>
          <tr className={styles.guestSelect}>
            <td>
              <div>
                <label htmlFor="checkin">
                  GUESTS
                </label>
                <input type="text" id="guests" value="1 guest" readOnly className={styles.guest} />
              </div>
            </td>
            <td onClick={handleGuestSelectClick}>
              <div className={styles.arrowDown}>
                &#8964;
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      {guestSelect}
    </div>
  );
};

export default ReservationForm;
