import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  useEffect(() => {
    whoami();
  }, []);

  const whoami = async () => {
    let user = await fetch("/api/v1/users/whoami");
    user = await user.json();
    setCurrentUser(user);
  };

  const logout = async () => {
    await fetch("/api/v1/users/logout");
    setCurrentUser(undefined);
  };

  const login = async (userToLogin) => {
    let user = await fetch("/api/v1/users/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userToLogin),
    });
    user = await user.json();

    if (user.error) {
      setFeedbackMessage("Email or password is invalid");
      setTimeout(() => {
        setFeedbackMessage(null);
      }, 3000);
      console.log(user.error);
      return;
    }

    setCurrentUser(user);
    console.log(user);
  };

  const register = async (userToRegister) => {
    let userToAdd = await fetch("/api/v1/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userToRegister),
    });

    userToAdd = await userToAdd.json();

    if (userToAdd.error) {
      setFeedbackMessage("A user with this email already exists.");
      setTimeout(() => {
        setFeedbackMessage(null);
      }, 3000);
      return false;
    }

    return true;
  };

  const values = {
    currentUser,
    feedbackMessage,
    login,
    register,
    logout,
  };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};

export default UserProvider;
