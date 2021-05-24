import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";

const ProfilePage = () => {
  const { currentUser } = useContext(UserContext);
  const [displayPreviousBookings, setDisplayPreviousBookings] = useState(false);

  const toggleBookings = () => {
    if (displayPreviousBookings) {
      setDisplayPreviousBookings(true);
    } else {
      setDisplayPreviousBookings(false);
    }
  };

  return (
    <div className="profilepage">
      <h1>Hi {currentUser.name} </h1>
      <h2>My bookings:</h2>
      <h3></h3>
    </div>
  );
};

export default ProfilePage;
