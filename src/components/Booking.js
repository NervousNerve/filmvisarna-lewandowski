import styles from "../css/Booking.module.css";

const Booking = () => {
  return (
    <div>
      <div className={styles.pricetypeWrapper}>
        <p>Adult</p>
        <span>-</span>
        <div>1</div>
        <span>+</span>
      </div>
    </div>
  );
};

export default Booking;
