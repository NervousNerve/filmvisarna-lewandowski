import { useState, useEffect } from "react";
import NumberInput from "./NumberInput";
import styles from "../css/Booking.module.css";

const Booking = () => {
  const [adult, setAdult] = useState(0);
  const [child, setChild] = useState(0);
  const [oldie, setOldie] = useState(0);
  const [feedback, setFeedback] = useState();
  const [errorFeedback, setErrorFeedback] = useState();
  const [screeningSchedule, setScreeningSchedule] = useState();
  const [chosenScreeningId, setchosenScreeningId] = useState();
  const [totalPrice, setTotalPrice] = useState(0);

  // will be updated with dynamic prop value from Movie Page
  let movieId = "60a632b98421e91fe4243b9e ";

  useEffect(() => {
    (async () => {
      let rebates = await fetch(`/api/v1/`);
      rebates = await rebates.json();
    })();
  }, [adult, child, oldie]);

  useEffect(() => {
    (async () => {
      let screening = await fetch(`/api/v1/screenings/${movieId}`);
      screening = await screening.json();
      setScreeningSchedule(screening);
    })();
  }, [movieId]);

  const confirmBooking = async () => {
    const request = {
      screeningId: chosenScreeningId,
      seats: adult + child + oldie,
    };

    if (!request.seats || !request.screeningId) {
      setFeedback("Please select both ticket and date!");
      setTimeout(() => {
        setFeedback("");
      }, 2500);
      return;
    }

    try {
      let booking = await fetch("/api/v1/bookings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(request),
      });

      if (!booking.ok) {
        throw new Error("API returned some kind of error.");
      }
    } catch (e) {
      // if the server is down
      setErrorFeedback("Sorry, something went wrong. Please try again.");
      setTimeout(() => {
        setErrorFeedback("");
      }, 4000);
    }
  };

  const handleChange = (e) => {
    setchosenScreeningId(e.target.value);
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
            <option value={""}>Date and time</option>
            {screeningSchedule &&
              screeningSchedule.map((screening, i) => {
                return (
                  <option value={screening._id} key={i}>
                    {new Date(screening.date).toLocaleString("sv-SE", {
                      timeZone: "Europe/Stockholm",
                    })}
                  </option>
                );
              })}
          </select>
        </div>
      </div>

      <p className={styles.feedback}>{feedback}</p>

      <div className={styles.totalPrice}>
        <p>Total: {totalPrice} SEK</p>
      </div>

      <div className={styles.seatBtn}>
        <button onClick={confirmBooking}>Confirm</button>
      </div>

      <p className={styles.errorFeedback}>{errorFeedback}</p>
    </div>
  );
};

export default Booking;
