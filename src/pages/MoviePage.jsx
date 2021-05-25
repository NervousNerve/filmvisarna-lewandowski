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
            <img src={movie.imageUrl} alt={movie.title} />
            <i></i>
          </div>
          <div className={style.content}>
            <div className={style.heading}>
              <div className={style.imgWrapper}>
                <img src={movie.imageUrl} alt={movie.title} />
              </div>
              <div className={style.title}>
                <button
                  onClick={() => {
                    bookTickets ? setBookTickets(false) : setBookTickets(true);
                  }}
                >
                  Book ticket
                </button>
                <h2>{movie.title}</h2>
                <h4>{movie.runtime} min</h4>
              </div>
            </div>
            <div className={style.text}>
              <div className={style.infoContainer}>
                <div className={style.info}>
                  <h4>Genres</h4>
                  <ul>
                    {movie.genre.map((genre) => {
                      return <li>{genre}</li>;
                    })}
                  </ul>
                </div>
                <div className={style.info}>
                  <h4>Actors</h4>
                  <p>
                    {movie.actors.map((actor, i) => {
                      if (
                        movie.actors.indexOf(actor) ===
                        movie.actors.length - 1
                      ) {
                        return actor;
                      } else {
                        return actor + ", ";
                      }
                    })}
                  </p>
                </div>
              </div>
              <h4>Plot</h4>
              <p>{movie.plot}</p>
              <div className={style.infoContainer}>
                <div className={style.info}>
                  <h4>Rated</h4>
                  <p>{movie.rated}</p>
                </div>
                <div className={style.info}>
                  <h4>Director</h4>
                  <p>{movie.director}</p>
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
        </div>
      )}
    </div>
  );
};

export default MoviePage;
