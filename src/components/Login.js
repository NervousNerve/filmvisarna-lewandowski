import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import styles from "../css/Login.module.css";

const Login = ({ toggleMenu }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, feedbackMessage } = useContext(UserContext);

  const handleLogin = (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };
    login(user);
  };

  return (
    <div className={styles.loginWrapper}>
      <h1>Sign in</h1>
      <p>You have to log in to book tickets.</p>
      <form className={styles.placeholder} onSubmit={handleLogin}>
        <div className={styles.inputContainer}>
          <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
          <input
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FontAwesomeIcon icon={faLock} className={styles.lockIcon} />
        </div>

        <button type="submit">Sign in</button>

        <div className={styles.feedbackMessage}>{feedbackMessage}</div>
      </form>

      <div className={styles.toggleMenuBtn}>
        <button type="button" onClick={() => toggleMenu()}>
          <p>
            Not a member?{" "}
            <span className={styles.highlighted}>Create account</span>
          </p>
        </button>
      </div>
    </div>
  );
};

export default Login;
