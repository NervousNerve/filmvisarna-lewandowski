import { useState } from "react";
import style from "../css/NumberInput.module.css";

const NumberInput = () => {
  const [value, setValue] = useState(0);

  const decrease = () => {
    let newValue = value - 1;
    setValue(newValue);
  };

  const increase = () => {
    let newValue = value - 1;
    setValue(newValue);
  };

  return (
    <div className={style.numberInput}>
      <button className="minusBtn" onClick={decrease} />
      <input
        className={style.quantity}
        min="0"
        name="quantity"
        type="number"
        value={value}
        /* onChange="`onChangeMethod + ${i}`" */
      />
      <button className={style.plus} onClick={increase} />
    </div>
  );
};

export default NumberInput;
