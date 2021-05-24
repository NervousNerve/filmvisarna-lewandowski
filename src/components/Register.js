import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import styles from "../css/Register.module.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [regexMessage, setRegexMessage] = useState(null);

  const { setUserToRegister, register, feedbackMessage } = useContext(
    UserContext
  );

  const handleRegister = (e) => {
    e.preventDefault();
    const regex = new RegExp(
      "^(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])"
    );

    if (regex.test(password)) {
      const user = {
        name: name,
        email: email,
        password: password,
      };
      setUserToRegister(user);
      register(user);
    } else {
      setRegexMessage(
        "Your password must be at least 6 characters long, contain both upper- and lowercase and one special character."
      );
    }
    setTimeout(() => {
      setRegexMessage(null);
    }, 3000);
  };

  return (
    <div>
      <h1>Sign up</h1>
      <p>Sign up to book tickets.</p>
      <form onSubmit={handleRegister}>
        <input
          placeholder="Name"
          type="text"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button>Create account</button>
      </form>
      <div className={styles.feedbackMessage}>
        {feedbackMessage}
        {regexMessage}
      </div>
    </div>
  );
};

export default Register;
