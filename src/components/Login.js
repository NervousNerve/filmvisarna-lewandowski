import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "../css/Login.module.css";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  const { login, setUserToLogin, currentUser } = useContext(UserContext);

  const handleLogin = (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };
    setUserToLogin(user);
    login(user);

    if (!currentUser) {
      setFeedbackMessage("Ditt användarnamn eller lösenord stämmer inte!");
    }
  };

  return (
    <div>
      <h1>Log in</h1>
      <p>You have to log in to book tickets.</p>
      <form className={styles.placeholder} onSubmit={() => handleLogin()}>
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
      </form>
    </div>
  );
};

export default Login;
