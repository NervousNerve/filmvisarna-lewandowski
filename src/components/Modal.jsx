import style from "../css/Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Modal = (props) => {
  return (
    <div className={style.modal}>
      <div className={style.modalContainer}>
        <div className={style.close}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
        {props.component && <div>{props.component}</div>}
      </div>
    </div>
  );
};

export default Modal;
