import styles from "../css/Movie-card.module.css";

const MovieCard = (props) => {
  return (
    <div className={styles.movieCard}>
      <div className={styles.imageWrapper}>
        <img src={props.movie.imageUrl} alt="movie thumbnail" />
      </div>
      <div className={styles.titleWrapper}>
        <h4>{props.movie.title}</h4>
      </div>
    </div>
  );
};

export default MovieCard;
