import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ConfirmationPage from "./pages/ConfirmationPage";
import Home from "./pages/home";
import MoviePage from "./pages/MoviePage";
import GuardedRoute from "./components/GuardedRoute";
import ProfilePage from "./pages/ProfilePage";
import Entry from "./components/Entry";
import { UserContext } from "./contexts/UserContext";
import { useContext } from "react";

function App() {
  const { currentUser } = useContext(UserContext);

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
        <GuardedRoute exact path="/profile" component={ProfilePage} auth={currentUser} />
      </BrowserRouter>
    </div>
  );
}

export default App;
