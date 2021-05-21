import { createContext } from "react";

export const UserContext = createContext();

const UserProvider = (props) => {
  const values = {};

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};

export default UserProvider;
