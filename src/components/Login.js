import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "../css/Login.module.css";

const Login = () => {
  return (
    <div>
      <h1>Log in</h1>
      <p>You have to log in to book tickets.</p>
      <form className={styles.placeholder}>
        <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
        <input placeholder="Email" type="email" />

        <FontAwesomeIcon icon={faLock} className={styles.lockIcon} />
        <input placeholder="Password" type="password" />

        <button>Log in</button>
      </form>
    </div>
  );
};

export default Login;
