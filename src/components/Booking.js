import styles from "../css/Booking.module.css";

const Booking = () => {
  return (
    <div className={styles.bookingWrapper}>
      <div className={styles.pricetypeWrapper}>
        <p>Adult</p>
        <div className={styles.addRemoveWrapper}>
          <div className={styles.addRemove}>
            <button>-</button>1<button>+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
