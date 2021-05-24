import { BrowserRouter } from "react-router-dom";
import UserProvider from "./contexts/UserContext";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter></BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
