import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import UserProvider from "./contexts/UserContext";
import Home from "./pages/home";
import Booking from "./components/Booking";
import Entry from "./components/Entry";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Navbar />
          <Entry />
          <Booking />
          <Route exact path="/">
            <Home />
          </Route>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
