import UserBookings from "../components/UserBookings";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";

//ability to edit user info to be implemented in next sprint

const ProfilePage = () => {
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);
  return (
    <div className="profilepage">
      {/* <h1>Hi {currentUser.name} </h1> */}
      <UserBookings />
    </div>
  );
};

export default ProfilePage;
