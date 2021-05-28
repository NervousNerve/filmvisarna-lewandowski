import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import UserProvider from "./contexts/UserContext";
import Home from "./pages/home";
import MoviePage from "./pages/MoviePage";
import Booking from "./components/Booking";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Navbar />
          <Booking />
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/movies/:movieId" component={MoviePage} />
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
