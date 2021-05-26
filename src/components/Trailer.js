import style from "../css/Trailer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const Trailer = (props) => {
  useEffect(() => {
    console.log(props.trailer);
  }, []);

  return (
    <div className={style.trailer}>
      <div className={style.video}>
        <div className={style.close}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <iframe src={`https://www.youtube.com/embed/${props.trailer}`}></iframe>
      </div>
    </div>
  );
};

export default Trailer;
