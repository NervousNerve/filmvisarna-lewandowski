import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  return (
    <div>
      <h1>Sign up</h1>
      <p>You have to log in to book tickets.</p>
      <form>
        <div>
          <FontAwesomeIcon icon={faUser} />
          <input placeholder="name" type="email" />
        </div>
        <div>
          <FontAwesomeIcon icon={faUser} />
          <input placeholder="email" type="text" />
        </div>
        <div>
          <FontAwesomeIcon icon={faLock} />
          <input placeholder="password" type="text" />
        </div>
        <button>Create account</button>
      </form>
    </div>
  );
};

export default Register;
