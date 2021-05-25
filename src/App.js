import { BrowserRouter } from "react-router-dom";
import UserProvider from "./contexts/UserContext";
import Booking from "./components/Booking";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Booking />
        <BrowserRouter></BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
