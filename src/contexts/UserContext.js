import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);

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
    setCurrentUser(null);
  };

  const login = async (userToLogin) => {
    let user = await fetch("/api/v1/users/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userToLogin),
    });
    user = await user.json();

    if (user.error) {
      return false;
    }
    setCurrentUser(user);
    return true;
  };

  const register = async (userToRegister) => {
    let userToAdd = await fetch("/api/v1/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userToRegister),
    });

    userToAdd = await userToAdd.json();

    if (userToAdd.error) {
      return false;
    }
    return true;
  };

  const edit = async (userToEdit) => {
    let editUser = await fetch("/api/v1/users", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userToEdit),
    });

    editUser = await editUser.json();
    
    if (editUser.error) {
      return false;
    }
    setCurrentUser(editUser);
    return true;
  };

  const values = {
    currentUser,
    login,
    register,
    logout,
    edit,
  };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};

export default UserProvider;
