import style from "../css/MoviePage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Entry from "../components/Entry";
import Modal from "../components/Modal";
import Booking from "../components/Booking";
import { UserContext } from "../contexts/UserContext";
import { useState, useEffect, useRef, useContext } from "react";

const MoviePage = (props) => {
  const myRef = useRef();
  const { movieId } = props.match.params;
  const [watchTrailer, setWatchTrailer] = useState(false);
  const [movie, setMovie] = useState(null);
  const { currentUser } = useContext(UserContext);

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

  return (
    <div className={`${style.moviePage} ${watchTrailer && "noScroll"}`}>
      {movie && (
        <div>
          {/* Trailer */}
          {watchTrailer && (
            <div className={style.trailerContainer}>
              <Modal
                onClose={() => {
                  setWatchTrailer(false);
                }}
              >
                <iframe
                  title={`${movie.title} Trailer`}
                  src={`https://www.youtube.com/embed/${movie.trailerUrl}`}
                  allowFullScreen
                ></iframe>
              </Modal>
            </div>
          )}
          {/* Hero image */}
          <div className={style.heroImg} onClick={() => setWatchTrailer(true)}>
            <div className={style.playButtonContainer}>
              <button>
                <FontAwesomeIcon
                  icon={faPlay}
                  aria-label="play button"
                  className={style.playIcon}
                />
              </button>
            </div>

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
                  className={"button"}
                  onClick={() => {
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
                  <p>{movie.actors.join(", ")}</p>
                </div>
              </div>
            </div>
            <div className={style.text}>
              <h4>Plot</h4>
              <p>{movie.fullPlot}</p>
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
            <div className={style.book} ref={myRef}>
              <h3>Book tickets</h3>
              <hr />
              {currentUser ? <Booking movie={movie} /> : <Entry />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviePage;
