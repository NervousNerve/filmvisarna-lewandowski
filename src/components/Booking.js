import { useState, useEffect } from "react";
import styles from "../css/Booking.module.css";
import NumberInput from "./NumberInput";

const Booking = () => {
  const [adult, setAdult] = useState(0);
  const [child, setChild] = useState(0);
  const [oldie, setOldie] = useState(0);
  const [feedback, setFeedback] = useState();

  useEffect(() => {
    //console.log("Adult: ", adult, "Child: ", child, "Oldie: ", oldie);
  }, [adult, child, oldie]);

  const confirmBooking = async () => {
    const request = {
      screeningId: "60a655dead5bec403ce90cb3",
      seats: [2, 3],
    };

    let booking = await fetch("/api/v1/bookings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(request),
    });
    booking = await booking.json();
  };

  const handleChange = () => {
    setFeedback(
      "Great choice of everything. We will pick out the best seats for you on this show and you'll find the details about it in your confirmation!"
    );
  };

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
          <select onChange={handleChange}>
            <option>Date and time</option>
            <option>test</option>
            <option>test</option>
          </select>
        </div>
      </div>

      <div className={styles.feedback}>{feedback}</div>

      <div className={styles.totalPrice}>
        <p>Total: $$$</p>
      </div>

      <div className={styles.seatBtn}>
        <button onClick={confirmBooking}>Confirm</button>
      </div>
    </div>
  );
};

export default Booking;
