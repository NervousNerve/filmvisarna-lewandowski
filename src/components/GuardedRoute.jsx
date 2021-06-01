import { Route, Redirect } from "react-router-dom";
// import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect } from "react";

const GuardedRoute = ({ component: Component, auth, ...rest }) => {
  //   const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if (auth) {
      console.log("auth is true");
      console.log(auth);
    } else {
      console.log("NO");
    }
  }, [auth]);

  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? <Component {...props} /> : <Redirect to="/" />
      }
    />
    // <div></div>
  );
};

export default GuardedRoute;
