import styles from "../css/Carousel.module.css";
import { useState } from "react";

const Carousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const featuredMovies = [
    {
      movie: "Interstellar",
      image: "assets/images/interstellar.jpg",
    },
    {
      movie: "Sprited Away",
      image: "assets/images/spirited-away.jpg",
    },
    {
      movie: "The Shining",
      image: "assets/images/the-shining.jpg",
    },
    {
      movie: "The Dark Knight",
      image: "assets/images/the-dark-knight.jpg",
    },
  ];

  const previousImage = () => {
    const lastIndex = featuredMovies.length - 1;
    const shouldResetIndex = currentImageIndex === 0;
    const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;
    setCurrentImageIndex(index);
  };

  const nextImage = () => {
    const lastIndex = featuredMovies.length - 1;
    const shouldResetIndex = currentImageIndex === lastIndex;
    const index = shouldResetIndex ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(index);
  };

  const testFunction = (itemToTest) => {
    if (itemToTest.movie === featuredMovies[currentImageIndex].movie) {
      return styles.active;
    } else {
      return;
    }
  };

  return (
    <div
      className={styles.carousel}
      style={{
        backgroundImage: `
      url(${featuredMovies[currentImageIndex].image})`,
      }}
    >
      <div className={styles.sliderArrowLeft} onClick={previousImage}></div>
      <div className={styles.titleAndIconWrapper}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.movieTitle}>
            {featuredMovies[currentImageIndex].movie}
          </h2>
        </div>
        <div className={styles.iconsWrapper}>
          {featuredMovies.map((movie, i) => {
            return (
              <hr
                key={i}
                className={`${styles.icon} ${testFunction(movie)}`}
              ></hr>
            );
          })}
        </div>
      </div>
      <div className={styles.sliderArrowRight} onClick={nextImage}></div>
    </div>
  );
};

export default Carousel;
