import style from "../css/SeatMap.module.css";
import { useState, useEffect } from "react";

const SeatMap = () => {
  const [theater, setTheater] = useState(null);

  const screening = {
    _id: "60a655dead5bec403ce90cef",
    occupiedseats: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ],
    date: "2021-06-06T12:00:00.000+00:00",
    movieId: "60a632b98421e91fe4243b9e",
    theaterId: "60a6435192b1562b546900d6",
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
          <div className={style.seats}>
            {theater.seatsPerRow.map((row, i) => {
              let seats = [];
              console.log("row:", i);
              for (let i = 0; i < row; i++) {
                console.log("seat:", i);
                seats[i] = (
                  <div className={style.checkboxSeat} key={i}>
                    <input
                      type="checkbox"
                      className={style.seat}
                      value={"seat"}
                      onClick={() => {}}
                    />
                    <div className={style.checkmark}></div>
                  </div>
                );
              }
              return (
                <div key={i} className={style.row}>
                  {seats}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatMap;
