import MovieCard from "./movieCard";
import styles from "../modules/movie-list.module.css";

const MovieList = () => {
  return (
    <div className={styles.movieList}>
      <MovieCard />
    </div>
  );
};

export default MovieList;
