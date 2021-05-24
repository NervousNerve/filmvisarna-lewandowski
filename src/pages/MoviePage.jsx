import style from "../css/MoviePage.module.css";
import { useState } from "react";

const MoviePage = (props) => {
  // const movie = props.movie

  const [bookTickets, setBookTickets] = useState(false);

  return (
    <div className={style.moviePage}>
      {movie && (
        <div>
          <div className={style.heroImg}>
            <img src={movie.img} alt="" />
            <i></i>
          </div>
          <div className="content">
            <div>
              <div className={style.imgWrapper}>
                <img src="" alt="" />
              </div>
              <button
                onClick={() => {
                  bookTickets ? setBookTickets(false) : setBookTickets(true);
                }}
              >
                Book ticket
              </button>
              <div className={style.title}>
                <h2>Title of the movie</h2>
                <h4>126 min</h4>
              </div>
            </div>
            <div className={style.text}>
              <div>
                <div className={style.info}>
                  <h4>Genres</h4>
                  <ul>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
                <div className={style.info}>
                  <h4>Age</h4>
                  <p></p>
                </div>
              </div>
              <h4>Plot</h4>
              <p></p>
              <div>
                <div className={style.info}>
                  <h4>Actors</h4>
                  <p></p>
                </div>
                <div className={style.info}>
                  <h4>Director</h4>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
          {bookTickets && (
            <div>
              <h3>Book tickets</h3>
              <hr />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MoviePage;
