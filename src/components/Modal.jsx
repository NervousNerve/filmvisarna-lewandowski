import style from "../css/Modal.module.css";

const Modal = (props) => {
  return (
    <div className={style.trailer}>
      <div className={style.video}>
        <div className={style.close}></div>
        {props.propTitle ? null : (
          <p>
            <input onChange={this.handleChange} value={this.state.inputText} />
          </p>
        )}
      </div>
    </div>
  );
};

export default Modal;
