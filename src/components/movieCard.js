import { useEffect, useState } from "react";

const MovieCard = () => {
  const [movieList, setMovieList] = useState(null);

  const getAllMovies = async () => {
    let movies = await fetch("/api/v1/movies/movies");
    movies = await movies.json();
    setMovieList(movies);
  };

  useEffect(() => {
    getAllMovies();
    console.log("use effect ran");
  }, []);

  console.log(movieList);

  return (
    <div className="movieCard">
      <h1>This is movieCard</h1>

      {movieList ? (
        movieList.map((movie, index) => {
          return (
            <div key={index}>
              <img src={movie.imageUrl} alt="movie thumbnail" />
              <p>{movie.title}</p>
            </div>
          );
        })
      ) : (
        <h2>Loading movies...</h2>
      )}
    </div>
  );
};

export default MovieCard;
