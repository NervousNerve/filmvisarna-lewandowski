import { useHistory } from "react-router-dom";

import styles from "../css/ConfirmationPage.module.css";

const ConfirmationPage = (props) => {
  const history = useHistory();

  const booking = props.history.location.state?.booking;

  const handleClick = () => {
    history.push(`/`);
  };

  if (!booking) {
    history.push("/");
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
      <div className={styles.orderDetails1}>
        <h3>{booking.screeningId.movieId.title}</h3>
        <div className={styles.orderDetails}>
          <h4>Booking Number:</h4>
          <p className={styles.p1}> {booking._id}</p>
          <h4>Price:</h4>
          <p> {booking.price} SEK</p>
          <h4>Date/Time:</h4>
          <p>
            {" "}
            {new Date(booking.screeningId.date).toLocaleString("sv-SE", {
              timeZone: "Europe/Stockholm",
            })}{" "}
          </p>
          <h4>Seat/Row:</h4>
          {booking.seats.map((seat, i) => (
            <p key={i}>
              {seat.row ? seat.row + ":" + seat.seat : seat}
              {i === booking.seats.length - 1 ? "" : ","}
            </p>
          ))}
          <h4>Runtime: </h4>
          <p className={styles.plot}>
            {booking.screeningId.movieId.runtime} min
          </p>
        </div>
      </div>
      <div className={styles.homeButton}>
        <button className={`button ${styles.backhome}`} onClick={handleClick}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
