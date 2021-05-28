import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ConfirmationPage from "./pages/ConfirmationPage";
import UserProvider from "./contexts/UserContext";
import Home from "./pages/home";
// import Entry from "./components/Entry";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Navbar />
          {/* <Entry /> */}
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/confirmation/:id" component={ConfirmationPage} />
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
