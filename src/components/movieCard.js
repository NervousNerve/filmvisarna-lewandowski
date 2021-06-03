import styles from "../css/Movie-card.module.css";
import { Link } from "react-router-dom";

const MovieCard = (props) => {
  return (
    <Link
      className={styles.movieCard}
      style={{ textDecoration: "none" }}
      to={`/movies/${props.movie._id}`}
    >
      <div
        className={styles.imageWrapper}
        style={{ backgroundImage: `url("${props.movie.imageUrl}")` }}
      ></div>
      <div className={styles.titleWrapper}>
        <h4 className={styles.movieTitle}>{props.movie.title}</h4>
      </div>
    </Link>
  );
};

export default MovieCard;
