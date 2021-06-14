import styles from "../css/Carousel.module.css";

const CarouselArow = (props) => {
  return (
    <div className={`sliderArrow ${direction}`} onClick={handleClick}>
      {icon}
    </div>
  );
};

export default CarouselArow;
