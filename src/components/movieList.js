import MovieCard from "./movieCard";
import styles from "../css/Movie-card.module.css";

const MovieList = ({ movies }) => {

  const renderContent = () =>{
    if(movies && movies.length !== 0){
      return(
        <div className={styles.movieList}>
          {movies.map((movie) => {
            return <MovieCard key={movie._id} movie={movie} />;
          })}
        </div>
      )        
    }else{
      return(
        <div className={styles.loadingContainer}>
          <div className={styles.imgContainer}>
            <img
              className={`${styles.loadingImg}`}
              src="/assets/icons/icon-popcorn.png"
              alt="Logo"
              />
          </div>
          {movies && movies.length === 0 ? (
            <h2 className={styles.smallerH2Font}>No movies matched your standards.</h2>
          ) : (
            <h2 className={styles.smallerH2Font}>Loading movies...</h2>
          )
          }
        </div>
      )
    }
  }

  return (
    <div className={styles.container}>
      {renderContent()}
    </div>
  );
};
export default MovieList;
