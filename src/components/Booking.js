import { useState, useEffect } from "react";
import styles from "../css/Booking.module.css";
import NumberInput from "./NumberInput";

const Booking = () => {
  const [adult, setAdult] = useState(0);
  const [child, setChild] = useState(0);
  const [oldie, setOldie] = useState(0);
  const [feedback, setFeedback] = useState();
  const [screeningSchedule, setScreeningSchedule] = useState();
  // will be updated with dynamic prop value from Movie Page
  let movieId = "60a632b98421e91fe4243bab";

  useEffect(() => {}, [adult, child, oldie]);

  useEffect(() => {
    (async () => {
      let screening = await fetch(`/api/v1/screenings/${movieId}`);
      screening = await screening.json();
      setScreeningSchedule(screening);
    })();
  }, [movieId]);

  const confirmBooking = async () => {
    const request = {
      screeningId: "60a655dead5bec403ce90cb3",
      seats: adult + child + oldie,
    };

    let booking = await fetch("/api/v1/bookings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(request),
    });
    await booking.json();
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
            {screeningSchedule &&
              screeningSchedule.map((date, i) => {
                return (
                  <option value={date.date} key={i}>
                    {new Date(date.date).toLocaleString("sv-SE", {
                      timeZone: "Europe/Stockholm",
                    })}
                  </option>
                );
              })}
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
