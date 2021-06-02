import styles from "../css/Movie-card.module.css";
import { useHistory } from "react-router-dom";

const MovieCard = (props) => {
  const history = useHistory();

  const handleMovieClick = (movidId, e) => {
    history.push(`/movies/${movidId}`);
  };

  //checks if user pressed enter
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      handleMovieClick(props.movie._id);
    }
  };

  return (
    <div
      className={styles.movieCard}
      onClick={() => {
        handleMovieClick(props.movie._id);
      }}
      onKeyDown={handleKeyPress}
      tabIndex="0"
    >
      <div className={styles.imageWrapper}>
        <img
          className={styles.movieImage}
          src={props.movie.imageUrl}
          alt="movie thumbnail"
        />
      </div>
      <div className={styles.titleWrapper}>
        <h4 className={styles.movieTitle}>{props.movie.title}</h4>
      </div>
    </div>
  );
};

export default MovieCard;
