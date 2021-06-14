import CarouselArrow from "./CarouselArrow";
import CarouselImageSlide from "./CarouselImageSlide";
import styles from "../css/Carousel.module.css";
import { useEffect, useState } from "react";

const Carousel = ({ movies }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  let images;
  let previousImage;
  let nextImage;

  //   Create an array with movies.imageUrl
  if (!movies) {
    console.log("No images to show");
  } else {
    images = movies.map((movie) => movie.imageUrl);
    console.log("images url after map: ", images);

    //onclick function to switch to previous image
    previousImage = () => {
      console.log("Previous image clicked");
      const lastIndex = movies.length - 1;
      const shouldResetIndex = currentImageIndex === 0;
      const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;
      setCurrentImageIndex(index);
    };

    //onclick function to switch to next image
    nextImage = () => {
      console.log("next image clicked");
      const lastIndex = movies.length - 1;
      const shouldResetIndex = currentImageIndex === lastIndex;
      const index = shouldResetIndex ? 0 : currentImageIndex + 1;
      setCurrentImageIndex(index);
    };
  }

  useEffect(() => {
    setInterval(() => {
      const lastIndex = movies.length - 1;
      const shouldResetIndex = currentImageIndex === lastIndex;
      const index = shouldResetIndex ? 0 : currentImageIndex + 1;
      setCurrentImageIndex(index);
    }, 4000);
  }, []);

  return (
    <div className="parentFUCKINGelement">
      {movies ? (
        <div className={styles.carousel}>
          <CarouselArrow direction="Left" handleClick={previousImage} />
          <CarouselImageSlide carouselImage={images[currentImageIndex]} />
          <CarouselArrow direction="Right" handleClick={nextImage} />
        </div>
      ) : (
        <div className="toMakeVsCodeHappy"></div>
      )}
    </div>
  );
};

export default Carousel;
