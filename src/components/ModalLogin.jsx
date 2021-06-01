import style from "../css/ModalLogin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Entry from "./Entry";

const ModalLogin = ({ children, onClose }) => {
  const handleClick = (e) => {
    if (e.target.id !== "modalChild") {
      onClose();
    }
  };

  return (
    <div className={style.modal} onClick={handleClick}>
      <div className={style.modalContainer}>
        <div className={style.close}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <Entry />
        <div id="modalChild">
          {children}
          
        </div>
      </div>
    </div>
  );
};

export default ModalLogin;
