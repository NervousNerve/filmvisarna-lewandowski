import { useState, useEffect, useContext } from "react";
import MovieList from "../components/movieList";
import styles from "../css/Home.module.css";
import { UserContext } from "../contexts/UserContext";

const Home = () => {
  const [movies, setMovies] = useState();
  const { currentUser } = useContext(UserContext);

  const getMovies = async () => {
    let movies = await fetch("/api/v1/movies");
    movies = await movies.json();
    setMovies(movies);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.imgContainer}>
        {currentUser && (
          <div className={styles.fade}>
            <h4>You're logged in</h4>
            {/* <h4 className={styles.glow}>You're logged in</h4> */}
          </div>
        )}
      </div>

      <div className={styles.textContainer}>
        <h2>In theatres now</h2>
        <h1>Inception</h1>
      </div>
      {movies && <h3>Popular shows</h3>}
      <MovieList movies={movies} />
    </div>
  );
};

export default Home;
