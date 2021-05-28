import style from "../css/MoviePage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Trailer from "../components/Trailer";
import Entry from "../components/Entry";
import Modal from "../components/Modal";
import { useState, useEffect, useRef } from "react";

const MoviePage = (props) => {
  const myRef = useRef();
  const { movieId } = props.match.params;
  const [bookTickets, setBookTickets] = useState(true);
  const [watchTrailer, setWatchTrailer] = useState(false);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    /* Get movie data from backend */
    (async (movieId) => {
      let movie = await fetch(`/api/v1/movies/${movieId}`);
      movie = await movie.json();
      setMovie(movie);
    })(movieId);
  }, [movieId]);

  /* Scroll to booking function */
  const scroll = () => {
    let scrollStop = myRef.current.offsetTop - 70;
    window.scrollTo({ behavior: "smooth", top: scrollStop });
  };

  /* Close trailer modal */
  const closeTrailer = (e) => {
    if (e.target !== "iframe") {
      setWatchTrailer(false);
    }
  };

  const trailer = movie && (
    <iframe
      title={`${movie.title} Trailer`}
      src={`https://www.youtube.com/embed/${movie.trailerUrl}`}
      allowFullScreen
    ></iframe>
  );

  const propTitle = "trailer";

  return (
    <div className={`${style.moviePage} ${watchTrailer && style.noScroll}`}>
      {movie && (
        <div>
          {/* Trailer */}
          {watchTrailer && (
            <div className={style.trailerContainer} onClick={closeTrailer}>
              <Modal trailer={trailer} propTitle={propTitle} />
            </div>
          )}
          {/* Hero image */}
          <div className={style.heroImg} onClick={() => setWatchTrailer(true)}>
            <FontAwesomeIcon icon={faPlay} className={style.playIcon} />
            <img src={movie.imageUrl} alt={movie.title} />
          </div>
          {/* Content */}
          <div className={style.content}>
            <div className={style.heading}>
              {/* Movie poster */}
              <div className={style.imgWrapper}>
                <img src={movie.imageUrl} alt={movie.title} />
              </div>
              <div className={style.title}>
                {/* Booking button */}
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
              <div className={`${style.infoContainer} ${style.infoGrid}`}>
                <div className={style.info}>
                  <h4>Genres</h4>
                  <ul>
                    {movie.genre.map((genre, i) => {
                      return <li key={i}>{genre}</li>;
                    })}
                  </ul>
                </div>
                <div className={style.info}>
                  <h4>Actors</h4>
                  {/* Separating actors with a comma */}
                  <p>
                    {movie.actors.map((actor) => {
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
            </div>
            <div className={style.text}>
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
            {/* Booking component */}
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
