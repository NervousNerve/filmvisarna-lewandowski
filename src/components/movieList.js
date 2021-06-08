import MovieCard from "./movieCard";
import styles from "../css/Movie-card.module.css";
import { useEffect, useState } from "react";

const MovieList = () => {
  const [movieList, setMovieList] = useState(null);

  const getAllMovies = async () => {
    let movies = await fetch("/api/v1/movies/");
    movies = await movies.json();
    setMovieList(movies);

    return;
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  return (
    <div className={styles.container}>
      {movieList ? (
        <div className={styles.movieList}>
          {movieList.map((movie, index) => {
            return <MovieCard key={index} movie={movie} />;
          })}
        </div>
      ) : (
        <div className={styles.loadingContainer}>
          <div className={styles.imgContainer}>
            <img
              className={`${styles.loadingImg}`}
              src="/assets/icons/icon-popcorn.png"
              alt="Logo"
            />
          </div>
          <h2 className={styles.smallerH2Font}>Loading movies...</h2>
        </div>
      )}
    </div>
  );
};
export default MovieList;
