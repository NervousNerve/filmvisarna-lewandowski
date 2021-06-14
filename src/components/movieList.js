import MovieCard from "./movieCard";
import styles from "../css/Movie-card.module.css";

const MovieList = ({ movies }) => {
  return (
    <div className={styles.container}>
      {movies ? (
        <div className={styles.movieList}>
          {movies.map((movie) => {
            return <MovieCard key={movie._id} movie={movie} />;
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
