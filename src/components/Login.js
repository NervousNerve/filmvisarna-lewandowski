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
      <h3>Sign in</h3>
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
          <FontAwesomeIcon icon={faLock} className={styles.lockIcon} />
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className={styles.feedbackMessage}>{feedbackMessage}</div>
        <button type="submit">Sign in</button>
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
