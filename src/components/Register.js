import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserToRegister } = useContext(UserContext);

  const handleRegister = (e) => {};

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
