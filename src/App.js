import { BrowserRouter, Route } from "react-router-dom";
import UserProvider from "./contexts/UserContext";
import Home from "./pages/home";
import Entry from "./components/Entry";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Entry />
          <Route exact path="/">
            <Home />
          </Route>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
