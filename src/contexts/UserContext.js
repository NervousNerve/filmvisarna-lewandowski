import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    // TODO: remove this function when we have a functioning login interface
    // explanation: it is a function to automatically log a user in on render
    (async () => {
      if (!(await whoami())) {
        let loggedInUser = await fetch("/api/v1/users/login", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            email: "test@testing4",
            password: "1234",
          }),
        });
        loggedInUser = await loggedInUser.json();
        setCurrentUser(loggedInUser);
      }
    })();
  }, []);

  // TODO: delete when testing is done
  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

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

  const values = { currentUser };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};

export default UserProvider;
