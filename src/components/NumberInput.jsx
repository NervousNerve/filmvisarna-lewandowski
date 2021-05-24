import style from "../css/NumberInput.module.css";

const NumberInput = () => {
  return (
    <div className={style.numberInput}>
      <button></button>
      {/* Onclick behövs senare för att få knapparna att fungera */}
      <input className={style.quantity} min="0" name="quantity" type="number" />
      <button className={style.plus}></button>
    </div>
  );
};

export default NumberInput;
