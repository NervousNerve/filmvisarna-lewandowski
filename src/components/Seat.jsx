import style from "../css/Seat.module.css";

const Seat = ({ seat, row }) => {
  return (
    <div className={style.seatWrapper}>
      <div className={style.yourSeat}></div>
      <p>
        Row {row}, Seat {seat}
      </p>
    </div>
  );
};

export default Seat;
