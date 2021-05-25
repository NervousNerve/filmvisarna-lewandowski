import styles from "../css/Booking.module.css";

const Booking = () => {
  return (
    <div className={styles.bookingWrapper}>
      <div className={styles.pricetypeWrapper}>
        <p>Adult</p>
        <div className={styles.addRemove}>
          <span>-</span>1<span>+</span>
        </div>
      </div>
    </div>
  );
};

export default Booking;
