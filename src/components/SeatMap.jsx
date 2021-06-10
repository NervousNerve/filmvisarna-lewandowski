import style from "../css/SeatMap.module.css";
import { useState, useEffect } from "react";

const SeatMap = () => {
  const [theater, setTheater] = useState(null);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const tickets = 3;
  const screening = {
    _id: "60a655dead5bec403ce90cef",
    occupiedSeats: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ],
    date: "2021-06-06T12:00:00.000+00:00",
    movieId: "60a632b98421e91fe4243b9e",
    theaterId: "60a6435192b1562b546900d5",
  };

  useEffect(() => {
    (async () => {
      let theaters = await fetch(`/api/v1/theaters`);
      theaters = await theaters.json();

      const theater = theaters.find(
        (theater) => theater._id === screening.theaterId
      );
      setTheater(theater);
    })();
  }, []);

  const handleChange = (e) => {
    if (selectedSeats.includes(parseInt(e.target.value))) {
      setSelectedSeats(
        selectedSeats.filter((seat) => seat !== parseInt(e.target.value))
      );
      return;
    }
    if (selectedSeats.length >= tickets) {
      e.preventDefault();
      return;
    }
    setSelectedSeats((prevState) => [...prevState, parseInt(e.target.value)]);
  };

  const generateSeats = () => {
    let offset = 0;
    let rows = [];
    for (const row of theater.seatsPerRow) {
      let seats = [];

      for (let i = 0; i < row; i++) {
        const seatNumber = offset + i + 1;
        seats[i] = (
          <div className={style.checkboxSeat} key={i}>
            <input
              type="checkbox"
              className={style.seat}
              value={seatNumber}
              onChange={handleChange}
              disabled={screening.occupiedSeats.includes(seatNumber)}
            />
            <div className={style.checkmark}></div>
          </div>
        );
      }
      offset += row;
      rows.push(
        <div key={row} className={style.row}>
          {seats}
        </div>
      );
    }
    return rows;
  };

  return (
    <div>
      {theater && (
        <div
          className={`${style.seatMap} ${
            theater.name === "Royal" && style.largeTheater
          }`}
        >
          <div className={style.seatDescWrapper}>
            <div className={style.seatDescContainer}>
              <div className={`${style.seatDesc} ${style.booked}`}></div>
              <p>Booked</p>
            </div>
            <div className={style.seatDescContainer}>
              <div className={`${style.seatDesc} ${style.available}`}></div>
              <p>Available</p>
            </div>
            <div className={style.seatDescContainer}>
              <div className={`${style.seatDesc} ${style.yours}`}></div>
              <p>Your seats</p>
            </div>
          </div>
          <hr />
          <div className={style.seats}>{generateSeats().map((row) => row)}</div>
        </div>
      )}
    </div>
  );
};

export default SeatMap;
