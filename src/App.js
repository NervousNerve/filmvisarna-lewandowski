import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ConfirmationPage from "./pages/ConfirmationPage";
import UserProvider from "./contexts/UserContext";
import Home from "./pages/home";
import MoviePage from "./pages/MoviePage";
import GuardedRoute from "./components/GuardedRoute";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Navbar />
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/confirmation/:id" component={ConfirmationPage} />
          <Route exact path="/movies/:movieId" component={MoviePage} />
          <GuardedRoute path="/profile" component={ProfilePage} />
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
