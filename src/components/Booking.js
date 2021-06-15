import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import NumberInput from "./NumberInput";
import styles from "../css/Booking.module.css";
import SeatMap from "./SeatMap";
import Seats from "./Seats";

const Booking = ({ movie }) => {
  const history = useHistory();
  const [adult, setAdult] = useState(0);
  const [child, setChild] = useState(0);
  const [senior, setSenior] = useState(0);
  const [feedback, setFeedback] = useState();
  const [errorFeedback, setErrorFeedback] = useState();
  const [screeningSchedule, setScreeningSchedule] = useState();
  const [moviePrice, setMoviePrice] = useState(0);
  const [rebates, setRebates] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [showSeatMap, setShowSeatMap] = useState(false);
  const [screening, setScreening] = useState();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTickets, setSelectedTickets] = useState(0);

  useEffect(() => {
    (async () => {
      setMoviePrice(movie.price);

      let screening = await fetch(`/api/v1/screenings/${movie._id}`);
      screening = await screening.json();
      setScreeningSchedule(screening);

      let rebates = await fetch(`/api/v1/bookings/rebates`);
      rebates = await rebates.json();
      setRebates(rebates);
    })();
  }, [movie]);

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
    setSelectedTickets(adult + senior + child);
  }, [adult, senior, child]);

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
      screeningId: screening ? screening._id : undefined,
      tickets: { adult, child, senior },
      seats: selectedSeats,
    };

    if (!selectedTickets || !request.screeningId) {
      setFeedback("Please select both ticket and date!");
      return;
    }

    if (selectedTickets !== selectedSeats.length) {
      setFeedback("The selected number of tickets and seats must match.");
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
      history.push("/confirmation", { booking });
    } catch (e) {
      // if the server is down
      setErrorFeedback("Sorry, something went wrong. Please try again.");
    }
  };

  const handleChange = (e) => {
    if (!e.target.value) {
      setShowSeatMap(false);
      setScreening(undefined);
      return;
    } else {
      setShowSeatMap(true);
      //filter through screeningSchedule and sets screening to the show that matches the e.target
      setScreening(
        screeningSchedule.filter(
          (screening) => screening._id === e.target.value
        )[0]
      );
    }
  };

  return (
    <div className={styles.bookingWrapper}>
      <div className={styles.bookingContainer}>
        <div>
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
              <span className="focus"></span>
            </div>
          </div>
        </div>

        {showSeatMap && (
          <SeatMap
            screening={screening}
            theater={screening.theaterId}
            setSelectedSeats={setSelectedSeats}
            selectedSeats={selectedSeats}
            selectedTickets={selectedTickets}
          />
        )}
      </div>

      <p className={styles.feedback}>{feedback}</p>

      <Seats seats={selectedSeats} />

      <div className={styles.totalPrice}>
        <h4>Total: {totalPrice} SEK</h4>
      </div>

      <div className={styles.seatBtn}>
        <button className={"button"} onClick={confirmBooking}>
          Confirm
        </button>
      </div>

      <p className={styles.errorFeedback}>{errorFeedback}</p>
    </div>
  );
};

export default Booking;
