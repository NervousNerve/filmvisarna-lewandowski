import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Navbar/>
      </BrowserRouter>
    </div>
  );
}

export default App;
