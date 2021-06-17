import { useState } from "react";
import Filter from "../components/Filter";
import MovieList from "../components/movieList";
import styles from "../css/Home.module.css";
import { NumberParam, StringParam, useQueryParams } from "use-query-params";

const Home = () => {
  const [movies, setMovies] = useState();
  const [query] = useQueryParams({
    search: StringParam,
    actor: StringParam,
    director: StringParam,
    genre: StringParam,
    rated: StringParam,
    language: StringParam,
    date: StringParam,
    minRun: NumberParam,
    maxRun: NumberParam,
    minPrice: NumberParam,
    maxPrice: NumberParam,
  });

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.imgContainer}></div>
      <div className={styles.textContainer}>
        <h2>In theatres now</h2>
        <h1>Inception</h1>
      </div>
      <Filter setMovies={setMovies}/>
      {movies && movies.length !== 0 && Object.values(query).every(o => o === undefined) ? <h3>Popular shows</h3> : <h3>Your filter results</h3>}

      <MovieList movies={movies} />
    </div>
  );
};

export default Home;
