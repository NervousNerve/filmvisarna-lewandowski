import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "../css/Login.module.css";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* const { login } = useContext(UserContext); */

  return (
    <div>
      <h1>Log in</h1>
      <p>You have to log in to book tickets.</p>
      <form className={styles.placeholder}>
        <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
        <input
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <FontAwesomeIcon icon={faLock} className={styles.lockIcon} />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button onClick={() => Login()}>Log in</button>
      </form>
    </div>
  );
};

export default Login;
