import { BrowserRouter, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar.jsx";
import ConfirmationPage from "./pages/ConfirmationPage";
import Entry from "./components/Entry.js";
import UserProvider from "./contexts/UserContext";
import Home from "./pages/home";
import MoviePage from "./pages/MoviePage";
import ProfilePage from "./pages/ProfilePage";
import { QueryParamProvider } from "use-query-params";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <QueryParamProvider ReactRouterRoute={Route}>
            <Navbar />
            <Route exact path="/">
              <Home />
            </Route>
            <Route
              exact
              path="/confirmation/:id"
              component={ConfirmationPage}
            />
            <Route exact path="/movies/:movieId" component={MoviePage} />
            <Route exact path="/profile" component={ProfilePage} />
          </QueryParamProvider>
        </BrowserRouter>
      </UserProvider>
      <Footer />
    </div>
  );
}

export default App;
