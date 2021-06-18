import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import styles from "../css/Register.module.css";

const Register = ({ toggleMenu }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [regexMessage, setRegexMessage] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const { register, login } = useContext(UserContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    const regex = new RegExp(
      "^(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])"
    );

    if (!regex.test(password)) {
      setRegexMessage(
        "Your password must be at least 6 characters long, contain both upper- and lowercase and one special character."
      );
      setTimeout(() => {
        setRegexMessage(null);
      }, 5000);
      return;
    }

    const user = {
      name: name,
      email: email,
      password: password,
    };

    let result = await register(user);
    if (!result) {
      setFeedbackMessage("A user with this email already exists.");
      setTimeout(() => {
        setFeedbackMessage(null);
      }, 3000);
      return;
    }

    login(user);
  };

  return (
    <div className={styles.registerContainer}>
      <h3>Register</h3>
      <p>Register to book tickets.</p>
      <form onSubmit={handleRegister}>
        <input
          className={"input"}
          placeholder="Name"
          type="text"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className={"input"}
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className={"input"}
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className={styles.feedbackMessage}>
          {feedbackMessage}
          {regexMessage}
        </div>

        <div className={styles.registerBtn}>
          <button className={"button"}>Create account</button>
        </div>
      </form>

      <div className={styles.toggleMenuBtn}>
        <button onClick={() => toggleMenu()}>
          <p>
            Already a member?{" "}
            <span className={styles.highlighted}>Sign in</span>
          </p>
        </button>
      </div>
    </div>
  );
};

export default Register;
