import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  const { setUserToRegister } = useContext(UserContext);

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
      setFeedbackMessage("Du har nu registrerat dig!");
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
      <form>
        <input placeholder="Name" type="email" />
        <input placeholder="Email" type="text" />
        <input placeholder="Password" type="text" />
        <button>Create account</button>
      </form>
    </div>
  );
};

export default Register;
