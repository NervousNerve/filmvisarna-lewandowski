import styles from "../modules/movie-card.module.css";

const MovieCard = (props) => {
  return (
    <div className={styles.cardsWrapper}>
      <div className={styles.movieCard}>
        <div className={styles.imageWrapper}>
          <img src={props.movie.imageUrl} alt="movie thumbnail" />
        </div>
        <div className={styles.titleWrapper}>
          <h4>{props.movie.title}</h4>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
