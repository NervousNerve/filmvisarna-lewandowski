import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ConfirmationPage from "./pages/ConfirmationPage";
// import UserProvider from "./contexts/UserContext";
import Home from "./pages/home";
import MoviePage from "./pages/MoviePage";
import GuardedRoute from "./components/GuardedRoute";
import ProfilePage from "./pages/ProfilePage";
import Entry from "./components/Entry";
import { UserContext } from "./contexts/UserContext";
import { useContext, useEffect, useState } from "react";

function App() {
  const { currentUser } = useContext(UserContext);
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    currentUser ? setIsAuth(true) : setIsAuth(false);
  }, [currentUser]);

  return (
    <div className="App">
      <BrowserRouter>
        <Entry />
        <Navbar />
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/confirmation/:id" component={ConfirmationPage} />
        <Route exact path="/movies/:movieId" component={MoviePage} />

        <GuardedRoute path="/profile" component={ProfilePage} auth={isAuth} />
      </BrowserRouter>
    </div>
  );
}

export default App;
