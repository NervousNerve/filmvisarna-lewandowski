import MovieList from "../components/movieList";
import styles from "../css/Home.module.css";

const Home = () => {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.imgContainer}>
        {/* <img
          src="https://m.media-amazon.com/images/M/MV5BNDExNDYxODc1MF5BMl5BanBnXkFtZTcwNDQ0OTk1Mw@@._V1_.jpg"
          alt="movie-img"
        ></img> */}
      </div>
      <h1>In theatres now!</h1>
      <h3>Popular shows</h3>
      <MovieList />
    </div>
  );
};

export default Home;
