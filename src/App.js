import { BrowserRouter } from "react-router-dom";
import UserProvider from "./contexts/UserContext";
import Home from "./pages/home";

function App() {
  return (
    <div className="App">
      <UserProvider>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
