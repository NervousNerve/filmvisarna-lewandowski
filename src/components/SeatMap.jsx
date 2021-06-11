import style from "../css/SeatMap.module.css";
import { useEffect } from "react";

const SeatMap = ({
  selectedTickets,
  selectedSeats,
  setSelectedSeats,
  screening,
  theater,
}) => {
  /* set selected seats state */
  const handleSeatClick = (e) => {
    if (selectedSeats.includes(parseInt(e.target.value))) {
      setSelectedSeats(
        selectedSeats.filter((seat) => seat !== parseInt(e.target.value))
      );
      return;
    }
    /* prevent selection of more seats than tickets */
    if (selectedSeats.length >= selectedTickets) {
      e.preventDefault();
      return;
    }
    setSelectedSeats([...selectedSeats, parseInt(e.target.value)]);
  };

  useEffect(() => {
    if (selectedTickets < selectedSeats.length) {
      let temporarySeats = [...selectedSeats];
      temporarySeats.sort().splice(temporarySeats.length - 1, 1);
      setSelectedSeats(temporarySeats);
    }
  }, [selectedTickets]);

  /* generate seats with seat numbers */
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
              onChange={handleSeatClick}
              checked={selectedSeats.includes(seatNumber)}
              /* if seat is occupied, make it disabled */
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
            theater.seatsPerRow[theater.seatsPerRow.length - 1] > 11 &&
            style.largeTheater
          }`}
        >
          {/* Simplify seatDescs?? */}
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
          <div className={style.seats}>{generateSeats()}</div>
        </div>
      )}
    </div>
  );
};

export default SeatMap;
