import MovieCard from "./movieCard";
import styles from "../modules/movie-list.module.css";

const MovieList = () => {
  return (
    <div className={styles.movieList}>
      {/* <div className={styles.listWrapper}> */}
      <MovieCard />
      {/* </div> */}
    </div>
  );
};

export default MovieList;
