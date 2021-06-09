import { BrowserRouter, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { UserContext } from "./contexts/UserContext";
import { useContext } from "react";
import GuardedRoute from "./components/GuardedRoute";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/home";
import MoviePage from "./pages/MoviePage";
import ProfilePage from "./pages/ProfilePage";
import ConfirmationPage from "./pages/ConfirmationPage";
import Footer from "./components/Footer";

function App() {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="App">
      <BrowserRouter>
        <QueryParamProvider ReactRouterRoute={Route}>
          <Navbar />
          <div className="pages">
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/confirmation" component={ConfirmationPage} />
            <Route exact path="/movies/:movieId" component={MoviePage} />
            <GuardedRoute
              exact
              path="/profile"
              component={ProfilePage}
              auth={currentUser}
            />
          </div>
          <Footer />
        </QueryParamProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
