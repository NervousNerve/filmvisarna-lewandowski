import styles from "../css/Movie-card.module.css";

const MovieCard = (props) => {
  const handleMovieClick = (x) => {
    // TODO activate history push to correct path
    // history.push(/moviePage/movie._id)
    console.log("this is clicked movieId: ", x);
  };

  return (
    <div
      className={styles.movieCard}
      onClick={() => {
        handleMovieClick(props.movie._id);
      }}
    >
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
