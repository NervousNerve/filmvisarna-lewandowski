import style from "../css/MoviePage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import Entry from "../components/Entry";
import { useState, useEffect, useRef } from "react";

const MoviePage = (props) => {
  const myRef = useRef();
  const { movieId } = props.match.params;
  const [bookTickets, setBookTickets] = useState(true);

  const [movie, setMovie] = useState(null);

  const getMovieById = async (movieId) => {
    let movie = await fetch(`/api/v1/movies/${movieId}`);
    movie = await movie.json();
    setMovie(movie);
  };

  useEffect(() => {
    getMovieById(movieId);
  }, []);

  const scroll = () => {
    let scrollStop = myRef.current.offsetTop - 70;
    window.scrollTo({ behavior: "smooth", top: scrollStop });
  };

  return (
    <div className={style.moviePage}>
      {movie && (
        <div>
          <div className={style.heroImg}>
            <FontAwesomeIcon icon={faPlay} className={style.playIcon} />
            <img src={movie.imageUrl} alt={movie.title} />
          </div>
          <div className={style.content}>
            <div className={style.heading}>
              <div className={style.imgWrapper}>
                <img src={movie.imageUrl} alt={movie.title} />
              </div>
              <div className={style.title}>
                <button
                  onClick={() => {
                    setBookTickets(true);
                    scroll();
                  }}
                >
                  Book tickets
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
                  <h4>Director</h4>
                  <p>{movie.director}</p>
                </div>
                <div className={style.info}>
                  <h4>Rated</h4>
                  <p>{movie.rated}</p>
                </div>
              </div>
            </div>
            {bookTickets && (
              <div className={style.book} ref={myRef}>
                <h3>Book tickets</h3>
                <hr />
                <Entry />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviePage;
