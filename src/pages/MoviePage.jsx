import style from "../css/MoviePage.module.css";
import { useState, useEffect } from "react";

const MoviePage = (props) => {
  // const movie = props.movie

  const [bookTickets, setBookTickets] = useState(false);

  // const [movie, setMovie] = useState();

  // const getMovieById = async () => {
  //   let movie = await fetch(`/api/v1/movies/movies/60a632b98421e91fe4243b96`);
  //   movie = await movie.json();
  //   setMovie(movie);
  // };

  // useEffect(() => {
  //   getMovieById();
  // }, []);

  const movie = {
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    title: "The dark knight",
    runtime: "152",
    genre: ["Action", "Crime", "Drama", "Thriller"],
    actors: [
      "Christian Bale",
      "Heath Ledger",
      "Aaron Eckhart",
      "Michael Caine",
    ],
    language: ["English", "Mandarin"],
    rated: "PG-13",
    plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    director: "Cristopher Nolan",
    trailerUrl: "EXeTwQWrcwY",
    price: 152,
  };

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
                <h3>{movie.title}</h3>
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
