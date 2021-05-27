import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ConfirmationPage from "./pages/ConfirmationPage";
import UserProvider from "./contexts/UserContext";
import Entry from "./components/Entry";

function App() {
  return (
    <div className="App">
      <UserProvider>
      <BrowserRouter>
        <Navbar />
        <Route exact path="/confirmation" component={ConfirmationPage} />
      </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
