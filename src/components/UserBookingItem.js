import { useState } from "react";
import styles from "../css/UserBookings.module.css";

const UserBookingItem = (props) => {
  const [booking] = useState(props.booking);

  return (
    <div className={styles.marginLeft}>
      <h3>{booking.screeningId.movieId.title}</h3>
      <h4>{booking.screeningId.theaterId.name}</h4>
      <p>
        <span className={styles.bold}>Date: </span>
        {new Date(booking.screeningId.date).toLocaleString("sv-SE", {
          timeZone: "Europe/Stockholm",
        })}
      </p>{" "}
      <div className={styles.seatContainer}>
        <p className={styles.bold}>
          {" "}
          {booking.seats.length === 1 ? "seat:" : "seats:"}
        </p>
        {booking.seats.map((seat, i) => (
          <p key={i} className={styles.seat}>
            {seat}
            {i === booking.seats.length - 1 ? "" : ","}
          </p>
        ))}
      </div>
      <p>
        <span className={styles.bold}>Total price: </span>
        {booking.price}
      </p>
    </div>
  );
};

export default UserBookingItem;
