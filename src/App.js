import { BrowserRouter, Route } from "react-router-dom";
import UserProvider from "./contexts/UserContext";
import MoviePage from "./pages/MoviePage";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Route exact path="/:movieId" component={MoviePage} />
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
