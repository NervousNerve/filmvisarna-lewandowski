import { useEffect, useState } from "react";
import styles from "../modules/movie-card.module.css";

const MovieCard = () => {
  const [movieList, setMovieList] = useState(null);

  const getAllMovies = async () => {
    let movies = await fetch("/api/v1/movies/movies");
    movies = await movies.json();
    setMovieList(movies);
  };

  useEffect(() => {
    getAllMovies();
    console.log("use effect ran");
  }, []);

  console.log(movieList);

  return (
    <div className={styles.cardsWrapper}>
      {movieList ? (
        movieList.map((movie, index) => {
          return (
            <div key={index} className={styles.movieCard}>
              <div className={styles.imageWrapper}>
                <img src={movie.imageUrl} alt="movie thumbnail" />
              </div>
              <div className={styles.titleWrapper}>
                <p>{movie.title}</p>
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
