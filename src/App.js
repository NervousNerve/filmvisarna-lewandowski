import { BrowserRouter } from "react-router-dom";
import UserProvider from "./contexts/UserContext";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter></BrowserRouter>
        <input type="text" className="search" placeholder="Search..." />
        <input type="text" />
        <button>Submit</button>
        <div className="custom-select">
          <select name="" id="">
            <option value="">Imorgon 22:00</option>
            <option value="">imorgom</option>
            <option value="">onsdag</option>
          </select>
        </div>
        <div className="number-input">
        <button className="counter"></button>
          <input className="quantity" min="0" name="quantity" type="number"/>
          <button className="plus counter"></button>
        </div>
      </UserProvider>
    </div>
  );
}

export default App;
