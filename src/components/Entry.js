import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import styles from "../css/Entry.module.css";

const Entry = () => {
  const [message, setMessage] = useState(false);
  const [menu, setMenu] = useState(false);

  const toggleMenu = () => {
    setMessage(!message);
    setMenu(!menu);
  };

  return (
    <div className={styles.entryContainer}>
      <div className={styles.inputContainer}>
        {menu ? (
          <Register toggleMenu={toggleMenu} />
        ) : (
          <Login toggleMenu={toggleMenu} />
        )}
      </div>
    </div>
  );
};

export default Entry;
