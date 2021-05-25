import { BrowserRouter } from "react-router-dom";
import UserProvider from "./contexts/UserContext";
import Home from "./pages/home";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <route exact path="/">
            <Home />
          </route>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
