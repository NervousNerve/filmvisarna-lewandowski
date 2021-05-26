import { useState } from "react";
import style from "../css/NumberInput.module.css";

const NumberInput = () => {
  const [value, setValue] = useState(0);

  const decrease = () => {
    console.log("click");
  };

  return (
    <div className={style.numberInput}>
      <button className="minusBtn" onClick={decrease} />
      <input
        className={style.quantity}
        min="0"
        name="quantity"
        type="number"
        defaultValue={value}
        /* onChange="`onChangeMethod + ${i}`" */
      />
      <button className={style.plus} />
    </div>
  );
};

export default NumberInput;
