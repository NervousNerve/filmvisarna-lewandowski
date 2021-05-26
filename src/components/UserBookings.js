import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";

const Bookings = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      <h2>My bookings:</h2>
    </div>
  );
};

export default Bookings;
