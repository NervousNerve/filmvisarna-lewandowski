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
    <div className={styles.confirmation}>
      <img
        className={styles.confirm}
        src="/assets/icons/confirm.svg"
        alt="confirm icon"
      />
      <div className={styles.thanks}>
        <h1>Thank you for booking with us!</h1>
        <h2>Your reservation is confirmed.</h2>
      </div>
      {/* <hr /> */}
      {/* <div className={styles.details}> */}
      <div className={styles.orderDetails}>
        {/* <div className={`${styles.detailsLeft}`}> */}
        <h4>Booking Number:</h4>
        <p className={styles.p1}> {booking._id}</p>
        <h4>Price:</h4>
        <p> {booking.price} kr</p>
        <h4>Date/Time:</h4>
        <p> {booking.screeningId.date}</p>
        <h4>Seat/Row:</h4>
        <p> {booking.seats.join(", ")}</p>
        <h4>Film description: </h4>
        <p className={styles.plot}> {booking.screeningId.movieId.plot}</p>
        {/* </div> */}
        {/* <div className={styles.detailsRight}>
            <p> {booking._id}</p>
            <p> {booking.price} kr</p>
            <p> {booking.screeningId.date}</p>
            <p> {booking.seats.join(", ")}</p>
            <p> {booking.screeningId.movieId.title}</p>
            <p className={styles.plot}> {booking.screeningId.movieId.plot}</p>
          </div> */}
      </div>
      {/* </div> */}
      <div className={styles.printButton}>
        <button onClick={handleClick} className={styles.backhome}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
