import { useState } from "react";
import style from "../css/NumberInput.module.css";

const NumberInput = ({ updateValue }) => {
  const [value, setValue] = useState(0);

  const decrease = () => {
    if (value !== 0) {
      let newValue = value - 1;
      setValue(newValue);
      updateValue(newValue);
    }
  };

  const increase = () => {
    if (value !== 80) {
      let newValue = value + 1;
      setValue(newValue);
      updateValue(newValue);
    }
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
      />
      <button className={style.plus} onClick={increase} />
    </div>
  );
};

export default NumberInput;
