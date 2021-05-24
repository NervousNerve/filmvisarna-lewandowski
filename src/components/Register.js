import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  const { setUserToRegister, register } = useContext(UserContext);

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
      setFeedbackMessage("Du har nu registrerat dig! Vänligen logga in.");
      setTimeout(() => {
        setFeedbackMessage(null);
      }, 3000);
    } else {
      setFeedbackMessage(
        "Ditt lösenord måste vara minst 6 tecken långt, innehålla både stora och små bokstäver samt ett specialtecken."
      );
    }
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
      {feedbackMessage}
    </div>
  );
};

export default Register;
