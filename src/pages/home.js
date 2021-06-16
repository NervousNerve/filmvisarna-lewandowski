import { useState, useEffect } from "react";
import MovieList from "../components/movieList";
import styles from "../css/Home.module.css";

const Home = () => {
  const [movies, setMovies] = useState();

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
      <div className={styles.imgContainer}></div>
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
