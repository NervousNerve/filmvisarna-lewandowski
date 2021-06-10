import Filter from "../components/Filter";
import MovieList from "../components/movieList";
import styles from "../css/Home.module.css";

const Home = () => {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.imgContainer}></div>
      <div className={styles.textContainer}>
        <h2>In theatres now</h2>
        <h1>Inception</h1>
      </div>
      <Filter />
      <h3>Popular shows</h3>
      <MovieList />
    </div>
  );
};

export default Home;
