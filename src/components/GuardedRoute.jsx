import { Route } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";

const GuardedRoute = ({ component: Component, auth, ...rest }) => {
  if (auth === undefined) return null;

  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? <Component {...props} /> : <ErrorPage.Unauthorized />
      }
    />
  );
};

export default GuardedRoute;
