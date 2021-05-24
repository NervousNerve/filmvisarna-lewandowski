import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  return (
    <div>
      <h1>Log in</h1>
      <p>You have to log in to book tickets.</p>
      <form>
        <div>
          <FontAwesomeIcon icon={faUser} />
          <input placeholder="email" type="email" />
        </div>

        <div>
          <FontAwesomeIcon icon={faLock} />
          <input placeholder="password" type="password" />
        </div>

        <button>Log in</button>
      </form>
    </div>
  );
};

export default Login;
