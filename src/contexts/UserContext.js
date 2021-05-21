import { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    whoami();
  }, []);

  const whoami = async () => {
    let user = await fetch("/api/v1/users/whoami", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(),
    });
    user = await user.json();

    if (user.success) {
      setCurrentUser(user);
      console.log(currentUser);
    } else if (user.error) {
      console.log(user.error);
    }
  };

  const values = { currentUser };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};

export default UserProvider;
