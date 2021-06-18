import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import styles from "../css/Login.module.css";

const Login = ({ toggleMenu }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const { login } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    let success = await login(user);
    if (!success) {
      setFeedbackMessage("Email or password is invalid");
      setTimeout(() => {
        setFeedbackMessage(null);
      }, 3000);
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <h3>Sign in</h3>
      <p>You have to log in to book tickets.</p>
      <form className={styles.placeholder} onSubmit={handleLogin}>
        <div className={styles.inputContainer}>
          <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
          <input
            className={"input"}
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <FontAwesomeIcon icon={faLock} className={styles.lockIcon} />
          <input
            className={"input"}
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className={styles.feedbackMessage}>{feedbackMessage}</div>
        <div className={styles.loginBtn}>
          <button className={"button"} type="submit">
            Sign in
          </button>
        </div>
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
