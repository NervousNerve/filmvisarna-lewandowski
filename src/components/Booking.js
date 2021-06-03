import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import NumberInput from "./NumberInput";
import styles from "../css/Booking.module.css";

const Booking = ({ movieId }) => {
  const history = useHistory();
  const [adult, setAdult] = useState(0);
  const [child, setChild] = useState(0);
  const [senior, setSenior] = useState(0);
  const [feedback, setFeedback] = useState();
  const [errorFeedback, setErrorFeedback] = useState();
  const [screeningSchedule, setScreeningSchedule] = useState();
  const [chosenScreeningId, setchosenScreeningId] = useState();
  const [moviePrice, setMoviePrice] = useState(0);
  const [rebates, setRebates] = useState();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    (async () => {
      let movie = await fetch(`/api/v1/movies/${movieId}`);
      movie = await movie.json();
      setMoviePrice(movie.price);

      let screening = await fetch(`/api/v1/screenings/${movieId}`);
      screening = await screening.json();
      setScreeningSchedule(screening);

      let rebates = await fetch(`/api/v1/bookings/rebates`);
      rebates = await rebates.json();
      setRebates(rebates);
    })();
  }, [movieId]);

  useEffect(() => {
    if (rebates) {
      setTotalPrice(
        Math.round(
          rebates.adultMultiplier * adult * moviePrice +
            rebates.childMultiplier * child * moviePrice +
            rebates.seniorMultiplier * senior * moviePrice
        )
      );
    }
  }, [adult, child, senior, moviePrice, rebates]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFeedback("");
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [feedback]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErrorFeedback("");
    }, 4000);

    return () => {
      clearTimeout(timeout);
    };
  }, [errorFeedback]);

  const confirmBooking = async () => {
    const request = {
      screeningId: chosenScreeningId,
      tickets: { adult, child, senior },
      seats: adult + child + senior,
    };

    if (!request.seats || !request.screeningId) {
      setFeedback("Please select both ticket and date!");
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

      booking = await booking.json();
      localStorage.setItem("booking", JSON.stringify(booking));
      history.push(`/confirmation/${booking._id}`);
    } catch (e) {
      // if the server is down
      setErrorFeedback("Sorry, something went wrong. Please try again.");
    }
  };

  const handleChange = (e) => {
    setchosenScreeningId(e.target.value);
  };

  return (
    <div className={styles.bookingWrapper}>
      <div className={styles.pricetypeWrapper}>
        <h4>
          Adult
          <p>Regular</p>
        </h4>

        <div className="number-input">
          <NumberInput updateValue={setAdult} />
        </div>
      </div>
      <div className={styles.pricetypeWrapper}>
        <h4>
          Child
          <p>30% discount</p>
        </h4>

        <div className="number-input">
          <NumberInput updateValue={setChild} />
        </div>
      </div>
      <div className={styles.pricetypeWrapper}>
        <h4>
          Senior
          <p>20% discount</p>
        </h4>

        <div className="number-input">
          <NumberInput updateValue={setSenior} />
        </div>
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
        <h4>Total: {totalPrice} SEK</h4>
      </div>

      <div className={styles.seatBtn}>
        <button onClick={confirmBooking}>Confirm</button>
      </div>

      <p className={styles.errorFeedback}>{errorFeedback}</p>
    </div>
  );
};

export default Booking;
