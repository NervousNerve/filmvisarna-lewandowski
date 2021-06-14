import styles from "../css/Carousel.module.css";

const CarouselImageSlide = () => {
  return (
    <div
      className={styles.carouselImageSlide}
      style={{ backgroundImage: `url(${carouselImage})` }}
    ></div>
  );
};

export default CarouselImageSlide;
