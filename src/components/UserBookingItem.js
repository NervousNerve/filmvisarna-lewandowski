import styles from "../css/UserBookings.module.css";
import { useEffect } from "react";

const UserBookingItem = ({ booking, cancelBooking }) => {
  const message =
    "Are you sure you want to cancel your reservation? This action can not be undone.";

  return (
    <div className={styles.ticketContainer}>
      <div className={styles.removeItemContainer}>
        <h3 className={styles.title}>{booking.screeningId.movieId.title}</h3>
        {cancelBooking && (
          <button
            className={styles.button}
            onClick={() => {
              if (window.confirm(message)) cancelBooking(booking._id);
            }}
          >
            x
          </button>
        )}
      </div>
      <h4 className={styles.noBottomMargin}>Theater: </h4>
      <p>{booking.screeningId.theaterId.name}</p>

      <p>
        <h4 className={styles.bold}>Date: </h4>
        {new Date(booking.screeningId.date).toLocaleString("sv-SE", {
          timeZone: "Europe/Stockholm",
        })}
      </p>
      <div className={styles.seatContainer}>
        <h4 className={`${styles.bold} ${styles.noTopMargin}`}>
          {booking.seats.length === 1 ? "Seat:" : "Seats:"}
        </h4>
        {booking.seats.map((seat, i) => (
          <p key={i} className={`${styles.seat} ${styles.noTopMargin}`}>
            {seat.row ? seat.row + ":" + seat.seat : seat}
            {i === booking.seats.length - 1 ? "" : ","}
          </p>
        ))}
      </div>

      <h4 className={`${styles.noTopMargin}`}>Runtime: </h4>
      <p> {booking.screeningId.movieId.runtime} min</p>

      <h4 className={`${styles.noTopMargin} ${styles.noBottomMargin}`}>
        Total price:{" "}
      </h4>
      <p>{booking.price} SEK</p>

      <h4>
        Booking number:
        <p>{booking._id}</p>
      </h4>
    </div>
  );
};

export default UserBookingItem;
