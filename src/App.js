import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import UserProvider from "./contexts/UserContext";
import Home from "./pages/home";
import MoviePage from "./pages/MoviePage";
import ProfilePage from "./pages/ProfilePage";
import { QueryParamProvider } from "use-query-params";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Entry />
        <BrowserRouter>
          <QueryParamProvider ReactRouterRoute={Route}>
            <Navbar />
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/movies/:movieId" component={MoviePage} />
            <Route exact path="/profile" component={ProfilePage} />
          </QueryParamProvider>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
