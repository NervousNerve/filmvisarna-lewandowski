import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "../css/ConfirmationPage.module.css";

const ConfirmationPage = (props) => {
  const history = useHistory();
  const [booking, setBooking] = useState();
  const { id } = props.match.params;

  const getBookingById = async (id) => {
    let booking = await fetch(`/api/v1/bookings/${id}`);
    booking = await booking.json();
    setBooking(booking);
  };

  const handleClick = () => {
    history.push(`/`);
  };

  useEffect(() => {
    getBookingById(id);
  }, [id]);

  if (!booking) {
    return null;
  }

  return (
    <div>
      <div className={styles.confirmation}>
        <img
          className={styles.confirm}
          src="/assets/icons/confirm.svg"
          alt="confirm icon"
        />
        <div className={styles.thanks}>
          <h1>Thank's for booking with FunkyFilm!</h1>
          <p>Booking confirmation</p>
        </div>
        <div className={styles.details}>
          <div className={styles.orderDetails}>
            <div className={styles.detailsLeft}>
              <p>Booking Number:</p>
              <p>Price:</p>
              <p>Date/Time:</p>
              <p>Seat/Row:</p>
              <p>Film description:</p>
            </div>
            <div className={styles.detailsRight}>
              <p> {booking._id}</p>
              <p> {booking.price} kr</p>
              <p> {booking.screeningId.date}</p>
              <p> {booking.seats.join(", ")}</p>
              <p> {booking.screeningId.movieId.title}</p>
              <p className={styles.plot}> {booking.screeningId.movieId.plot}</p>
            </div>
          </div>
        </div>
        <div className={styles.printButton}>
          <button onClick={handleClick} className={styles.backhome}>
            Back to Home
          </button>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
