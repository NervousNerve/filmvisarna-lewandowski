import { useState } from "react";
import styles from "../css/UserBookings.module.css";

const UserBookingItem = (props) => {
  const [booking] = useState(props.booking);
  const [showPrevious] = useState(props.showPrevious);

  const cancelBooking = (e) => {
    console.log("deleting", e.target.parentNode);
  };

  return (
    <div className={styles.ticketContainer} id="id">
      <h3 className={styles.title}>{booking.screeningId.movieId.title}</h3>
      <h4 className={styles.noBottomMargin}>
        Theater: {booking.screeningId.theaterId.name}
      </h4>
      <p>
        <span className={styles.bold}>Date: </span>
        {new Date(booking.screeningId.date).toLocaleString("sv-SE", {
          timeZone: "Europe/Stockholm",
        })}
      </p>{" "}
      <div className={styles.seatContainer}>
        <p className={`${styles.bold} ${styles.noTopMargin}`}>
          {" "}
          {booking.seats.length === 1 ? "Seat:" : "Seats:"}
        </p>
        {booking.seats.map((seat, i) => (
          <p key={i} className={`${styles.seat} ${styles.noTopMargin}`}>
            {seat}
            {i === booking.seats.length - 1 ? "" : ","}
          </p>
        ))}
      </div>
      <p className={`${styles.noTopMargin} ${styles.noBottomMargin}`}>
        <span className={`${styles.bold}`}>Total price: </span>
        {booking.price} SEK
      </p>
      <p>
        <span className={styles.bold}> Booking number: </span>
        {booking._id}
      </p>
      {!showPrevious && (
        <button
          className={styles.button}
          onClick={(e) => {
            if (window.confirm("Are you sure you wish to cancel your booking?"))
              cancelBooking(e);
          }}
        >
          Cancel booking
        </button>
      )}
    </div>
  );
};

export default UserBookingItem;
