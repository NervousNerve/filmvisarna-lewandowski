import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [userToLogin, setUserToLogin] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  useEffect(() => {
    whoami();
  }, []);

  const whoami = async () => {
    let user = await fetch("/api/v1/users/whoami");
    user = await user.json();
    setCurrentUser(user);

    if (user) {
      console.log("Got a user");
    } else {
      console.log(user);
    }

    return user;
  };

  const login = async (userToLogin) => {
    let user = await fetch("/api/v1/users/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userToLogin),
    });
    user = await user.json();
    console.log(user);

    if (user.success) {
      setCurrentUser(user);
      // push to profile page
    } else if (user.error) {
      setFeedbackMessage("Email or password is invalid");
      setTimeout(() => {
        setFeedbackMessage(null);
      }, 3000);
      console.log(user.error);
    }
  };

  const values = { currentUser, login, setUserToLogin, feedbackMessage };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};

export default UserProvider;
