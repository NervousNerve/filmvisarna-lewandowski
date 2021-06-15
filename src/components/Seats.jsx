import style from "../css/Seats.module.css";

const Seats = ({ seats }) => {
  return (
    <div className={style.seats}>
      {seats.length > 0 &&
        seats.sort().map((seat) => {
          return (
            <div className={style.seatWrapper}>
              <div className={style.yourSeat}></div>
              <p>Row 3, Seat {seat}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Seats;
