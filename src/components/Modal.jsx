import style from "../css/Modal.module.css";

const Modal = (props) => {
  return (
    <div className={style.trailer}>
      <div className={style.video}>
        <div className={style.close}></div>
        {props.propTitle === "trailer" ? (
          <div>{props.trailer}</div>
        ) : (
          <div>hej</div>
        )}
      </div>
    </div>
  );
};

export default Modal;
