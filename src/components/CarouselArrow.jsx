// import styles from "../css/Carousel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const CarouselArrow = ({ direction, handleClick }) => {
  console.log("direction: ", direction);

  return (
    <div className={`sliderArrow ${direction}`} onClick={handleClick}>
      <FontAwesomeIcon
        icon={direction === "Left" ? faArrowLeft : faArrowRight}
      />
    </div>
  );
};

export default CarouselArrow;
