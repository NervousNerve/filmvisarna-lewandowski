import { BrowserRouter } from "react-router-dom";
import UserProvider from "./contexts/UserContext";
import Entry from "./components/Entry";

function App() {
  return (
    <div className="App">
      <Entry />
      <UserProvider>
        <BrowserRouter></BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
