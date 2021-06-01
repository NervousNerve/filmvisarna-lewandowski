import MovieList from "../components/movieList";
import styles from "../css/Home.module.css";

const Home = () => {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.imgContainer}></div>
      <div className={styles.textContainer}>
        <h1>In theatres now</h1>
        <p>Inception</p>
      </div>
      <h3>Popular shows</h3>
      <MovieList />
    </div>
  );
};

export default Home;
