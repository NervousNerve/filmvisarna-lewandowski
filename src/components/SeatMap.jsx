import style from "../css/SeatMap.module.css";

const SeatMap = () => {
  return <div className={style.seatMap}></div>;
};

  return (
    <div className={style.seatMap}>
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
    </div>
  );
};

export default SeatMap;
