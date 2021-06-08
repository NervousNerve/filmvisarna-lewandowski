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
    // Check if recent booking exists in local storage
    // that matches 'id' parameter, otherwise leave the page
    const item = localStorage.getItem("booking");
    localStorage.removeItem("booking");
    const savedBooking = JSON.parse(item);
    if (!item || savedBooking?._id !== id) {
      history.push("/");
      return;
    }
    getBookingById(id);
  }, [id, history]);

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
          <p> {booking.seats.join(", ")}</p>
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
