import { BrowserRouter, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar.jsx";
import UserProvider from "./contexts/UserContext";
import Home from "./pages/home";
import MoviePage from "./pages/MoviePage";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Navbar />
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/movies/:movieId" component={MoviePage} />
        </BrowserRouter>
      </UserProvider>
      <Footer />
    </div>
  );
}

export default App;
