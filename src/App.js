import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import UserProvider from "./contexts/UserContext";
import Home from "./pages/home";
import Entry from "./components/Entry";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Entry />
        <BrowserRouter>
          <Navbar />
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/profile" component={ProfilePage} />
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
