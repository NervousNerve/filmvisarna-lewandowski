import Login from "./Login";
import Register from "./Register";
import { useState } from "react";
import styles from "./css/Entry.module.css";

const Entry = () => {
  const [message, setMessage] = useState(false);
  const [menu, setMenu] = useState(false);

  const toggleMenu = (e) => {
    setMessage(!message);
    setMenu(!menu);
  };

  return (
    <div>
      {menu ? <Login /> : <Register />}

      <p onClick={() => toggleMenu()}>
        {message
          ? "Not a user? Register here!"
          : "Already user? Please log in!"}
      </p>
    </div>
  );
};

export default Entry;
