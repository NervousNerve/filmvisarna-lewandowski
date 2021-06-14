import CarouselArow from "./CarouselArrow";
import CarouselImageSlide from "./CarouselImageSlide";
import styles from "../css/Carousel.module.css";
import { useState } from "react";

const Carousel = ({ movies }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  //Create an array with movies.img

  const previousImage = () => {
    const lastIndex = imgUrls.length - 1;
    const { currentImageIndex } = this.state;
    const shouldResetIndex = currentImageIndex === 0;
    const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;

    setCurrentImageIndex(index);
  };

  const nextImage = () => {};

  return (
    <div className={styles.carousel}>
      <CarouselArow
        direction="left"
        handleClick={previousImage}
        icon={`${(<i className="fa fa-arrow-left" aria-hidden="true"></i>)}`}
      />
      <CarouselImageSlide car />
      <CarouselArow
        direction="right"
        handleClick={nextImage}
        icon={`${(<i className="fa fa-arrow-right" aria-hidden="true"></i>)}`}
      />
    </div>
  );
};

export default Carousel;
