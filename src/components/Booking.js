import { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
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
  const [bookingId, setBookingId] = useState();

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
        Math.ceil(
          rebates.adultMultiplier * adult * moviePrice +
            rebates.childMultiplier * child * moviePrice +
            rebates.seniorMultiplier * senior * moviePrice
        )
      );
    }
  }, [adult, child, senior, moviePrice, rebates]);

  const confirmBooking = async () => {
    const request = {
      screeningId: chosenScreeningId,
      seats: adult + child + senior,
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

      booking = await booking.json();
      console.log(booking);

      //history.push("/confirmation/bookingId");

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
        <div className="grid-item">
          <NumberInput updateValue={setAdult} />
        </div>
      </div>
      <div className={styles.pricetypeWrapper}>
        <p>Child</p>
        <div className="grid-item">
          <NumberInput updateValue={setChild} />
        </div>
      </div>
      <div className={styles.pricetypeWrapper}>
        <p>Senior</p>
        <div className="grid-item">
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
