import styles from "../css/UserBookings.module.css";

const UserBookingItem = ({ booking, cancelBooking }) => {
  const message =
    "Are you sure you want to cancel your reservation? This action can not be undone.";

  return (
    <div className={styles.ticketContainer}>
      <div className={styles.removeItemContainer}>
        <h3 className={styles.title}>{booking.screeningId.movieId.title}</h3>
        <button
          className={styles.button}
          onClick={() => {
            if (window.confirm(message)) cancelBooking(booking._id);
          }}
        >
          x
        </button>
      </div>
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
            {seat.row ? seat.row + ":" + seat.seat : seat}
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
    </div>
  );
};

export default UserBookingItem;
