import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "../css/Login.module.css";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    login,
    userToLogin,
    setUserToLogin,
    currentUser,
    feedbackMessage,
  } = useContext(UserContext);

  /* useEffect(() => {
    console.log(email, password);
  }, [email, password]); */

  const handleLogin = (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    setUserToLogin(user);
    login(user);
  };

  return (
    <div>
      <h1>Log in</h1>
      <p>You have to log in to book tickets.</p>
      <form className={styles.placeholder} onSubmit={handleLogin}>
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

        <button>Log in</button>

        <div className={styles.feedbackMessage}>{feedbackMessage}</div>
      </form>
    </div>
  );
};

export default Login;
