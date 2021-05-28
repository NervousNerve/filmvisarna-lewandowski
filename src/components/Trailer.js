import style from "../css/Trailer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Trailer = (props) => {
  return (
    <div className={style.trailer}>
      <div className={style.video}>
        <div className={style.close}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <iframe
          title={`${props.movieTitle} Trailer`}
          src={`https://www.youtube.com/embed/${props.trailer}`}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Trailer;
