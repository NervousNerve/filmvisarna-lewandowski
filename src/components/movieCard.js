import styles from "../css/Movie-card.module.css";
import { useHistory } from "react-router-dom";

const MovieCard = (props) => {
  const history = useHistory();

  const handleMovieClick = (movidId) => {
    history.push(`/movies/${movidId}`);
    console.log("this is clicked movieId: ", movidId);
  };

  return (
    <div
      className={styles.movieCard}
      onClick={() => {
        handleMovieClick(props.movie._id);
      }}
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
