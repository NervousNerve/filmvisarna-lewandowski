import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

const GuardedRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default GuardedRoute;
