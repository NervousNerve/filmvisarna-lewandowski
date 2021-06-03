import style from "../css/Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ children, onClose }) => {
  const handleClick = (e) => {
    let element = document.querySelector("#modalChild")
    if (!element.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div className={style.modal} onClick={handleClick}>
      <div className={style.modalContainer}>
        <button className={style.close}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div id="modalChild">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
