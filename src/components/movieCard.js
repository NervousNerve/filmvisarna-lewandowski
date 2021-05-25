import { useEffect, useState } from "react";
import styles from "../modules/movie-card.module.css";

const MovieCard = () => {
  const [movieList, setMovieList] = useState(null);

  const getAllMovies = async () => {
    let movies = await fetch("/api/v1/movies/movies");
    movies = await movies.json();
    setMovieList(movies);
    return;
  };

  useEffect(() => {
    getAllMovies();
    console.log("use effect ran");
  }, []);

  const handleMovieClick = (movie) => {
    // TODO activate history push to correct path
    // history.push(/moviePage/movie)
    console.log("this is clicked movie: ", movie);
  };

  return (
    <div className={styles.cardsWrapper}>
      {movieList ? (
        movieList.map((movie, index) => {
          return (
            <div
              onClick={() => {
                handleMovieClick(movie.title);
              }}
              key={index}
              className={styles.movieCard}
            >
              <div className={styles.imageWrapper}>
                <img src={movie.imageUrl} alt="movie thumbnail" />
              </div>
              <div className={styles.titleWrapper}>
                <h4>{movie.title}</h4>
              </div>
            </div>
          );
        })
      ) : (
        <h2>Loading movies...</h2>
      )}
    </div>
  );
};

export default MovieCard;
