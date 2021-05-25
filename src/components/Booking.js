import styles from "../css/Booking.module.css";
import NumberInput from "./NumberInput";

const Booking = () => {
  return (
    <div className={styles.bookingWrapper}>
      <div className={styles.pricetypeWrapper}>
        <p>Adult</p>
        <NumberInput />
      </div>
      <div className={styles.pricetypeWrapper}>
        <p>Child</p>
        <NumberInput />
      </div>
      <div className={styles.pricetypeWrapper}>
        <p>Oldie</p>
        <NumberInput />
      </div>

      <div className={styles.selectWrapper}>
        <div className="custom-select">
          <select>
            <option>test</option>
            <option>test</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Booking;
