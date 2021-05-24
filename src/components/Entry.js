import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import styles from "../css/Entry.module.css";

const Entry = () => {
  const [message, setMessage] = useState(false);
  const [menu, setMenu] = useState(false);

  const toggleMenu = (e) => {
    setMessage(!message);
    setMenu(!menu);
  };

  return (
    <div className={styles.entryContainer}>
      <div className={styles.inputContainer}>
        {menu ? <Register /> : <Login />}
      </div>

      <p onClick={() => toggleMenu()}>
        {message
          ? "Not a user? Register here!"
          : "Already user? Please log in!"}
      </p>
    </div>
  );
};

export default Entry;
