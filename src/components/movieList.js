import MovieCard from "./movieCard";
import styles from "../css/Movie-card.module.css";
import { useEffect, useState } from "react";

const MovieList = () => {
  const [movieList, setMovieList] = useState(null);

  const getAllMovies = async () => {
    let movies = await fetch("/api/v1/movies");
    movies = await movies.json();
    setMovieList(movies);
    return;
  };

  useEffect(() => {
    getAllMovies();
    console.log("use effect ran");
  }, []);

  const handleMovieClick = (x) => {
    // TODO activate history push to correct path
    // history.push(/moviePage/movie._id)
    console.log("this is clicked movieId: ", x);
  };

  return (
    <div className={styles.container}>
      <div className={styles.movieList}>
        {movieList ? (
          movieList.map((movie, index) => {
            return (
              <MovieCard
                key={index}
                movie={movie}
                onClick={() => {
                  handleMovieClick(movie._id);
                }}
              />
            );
          })
        ) : (
          <h2>Loading movies...</h2>
        )}
      </div>
    </div>
  );
};
export default MovieList;
