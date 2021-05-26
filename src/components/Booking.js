import { useState, useEffect } from "react";
import styles from "../css/Booking.module.css";
import NumberInput from "./NumberInput";

const Booking = () => {
  const [adult, setAdult] = useState(0);
  const [child, setChild] = useState(0);
  const [oldie, setOldie] = useState(0);

  useEffect(() => {
    console.log("Adult: ", adult, "Child: ", child, "Oldie: ", oldie);
  }, [adult, child, oldie]);

  return (
    <div className={styles.bookingWrapper}>
      <div className={styles.pricetypeWrapper}>
        <p>Adult</p>
        <NumberInput updateValue={setAdult} />
      </div>
      <div className={styles.pricetypeWrapper}>
        <p>Child</p>
        <NumberInput updateValue={setChild} />
      </div>
      <div className={styles.pricetypeWrapper}>
        <p>Oldie</p>
        <NumberInput updateValue={setOldie} />
      </div>

      <div className={styles.selectWrapper}>
        <div className="custom-select">
          <select>
            <option>test</option>
            <option>test</option>
          </select>
        </div>
      </div>

      <div className={styles.seatBtn}>
        <button>Pick seats</button>
      </div>

      <div className={styles.totalPrice}>
        <p>Total: $$$</p>
      </div>
    </div>
  );
};

export default Booking;
