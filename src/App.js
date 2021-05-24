import { BrowserRouter, Route } from "react-router-dom";
import UserProvider from "./contexts/UserContext";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Route exact path="/profile" component={ProfilePage} />
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
