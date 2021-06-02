import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ConfirmationPage from "./pages/ConfirmationPage";
import UserProvider from "./contexts/UserContext";
import Home from "./pages/home";
import MoviePage from "./pages/MoviePage";
import GuardedRoute from "./components/GuardedRoute";
import ProfilePage from "./pages/ProfilePage";
import { UserContext } from "./contexts/UserContext";
import { useContext } from "react";
import { QueryParamProvider } from "use-query-params";

function App() {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="App">
      <BrowserRouter>
          <QueryParamProvider ReactRouterRoute={Route}>
            <Navbar />
            <Route exact path="/">
              <Home />
            </Route>
        <Route exact path="/confirmation/:id" component={ConfirmationPage} />
        <Route exact path="/movies/:movieId" component={MoviePage} />
        <GuardedRoute exact path="/profile" component={ProfilePage} auth={currentUser} />
          </QueryParamProvider>
        </BrowserRouter>
    </div>
  );
}

export default App;
