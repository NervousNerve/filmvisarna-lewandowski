import style from "../css/Seat.module.css";
import calcRow from "../util/calcRow";

const Seat = ({ seat, seatsPerRow }) => {
  return (
    <div className={style.seatWrapper}>
      <div className={style.yourSeat}></div>
      <p>
        Row {calcRow(seat, seatsPerRow)}, Seat {seat}
      </p>
    </div>
  );
};

export default Seat;
