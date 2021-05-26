import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import UserBookingItem from "../components/UserBookingItem";
import styles from "../css/UserBookings.module.css";

const UserBookings = () => {
  const [showUpcomingBookings, setShowUpcomingBookings] = useState(true);
  const [upcomingBookings, setUpcomingBookings] = useState(null);
  const [previousBookings, setPreviousBookings] = useState(null);

  // useEffect(() => {
  //   if (localStorage.getItem("showUpcomingBookings")) {
  //     setShowUpcomingBookings(localStorage.getItem("showUpcomingBookings"));
  //   }
  // }, []);

  useEffect(async () => {
    // localStorage.setItem("showUpcomingBookings", showUpcomingBookings);
    if (showUpcomingBookings) {
      let getUpcomingBookings = await fetch(`/api/v1/bookings/`);
      getUpcomingBookings = await getUpcomingBookings.json();
      setUpcomingBookings(getUpcomingBookings);
    } else {
      let getPreviousBookings = await fetch(`/api/v1/bookings?previous=true`);
      getPreviousBookings = await getPreviousBookings.json();

      setPreviousBookings(getPreviousBookings);
    }
  }, [showUpcomingBookings]);

  useEffect(() => {
    console.log(upcomingBookings, previousBookings);
  }, [upcomingBookings, previousBookings]);

  const renderUpcoming = () => {
    if (showUpcomingBookings && upcomingBookings) {
      return (
        <div>
          {upcomingBookings.map((booking, i) => (
            <UserBookingItem key={i} booking={booking} />
          ))}
        </div>
      );
    } else if (!showUpcomingBookings && previousBookings) {
      return (
        <div>
          <div>
            {previousBookings.map((booking, i) => (
              <UserBookingItem key={i} booking={booking} />
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <p>No upcoming bookings to show</p>
        </div>
      );
    }
  };

  // const renderPrevious = () => {
  //   if (previousBookings) {
  //     return (
  //       <div>
  //         <div>
  //           {previousBookings.map((booking, i) => (
  //             <UserBookingItem key={i} booking={booking} />
  //           ))}
  //         </div>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div>
  //         <p>No previous bookings to show</p>
  //       </div>
  //     );
  //   }
  // };

  useEffect(() => {
    console.log("showupcomingbookings:", showUpcomingBookings);
  }, [showUpcomingBookings]);

  const toggleBookings = (e) => {
    e.preventDefault();
    setShowUpcomingBookings(!showUpcomingBookings);
  };

  return (
    <div>
      <h2>My bookings:</h2>
      <label
        className={styles.switch}
        onClick={(e) => {
          toggleBookings(e);
        }}
      >
        <input type="checkbox" />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
      {renderUpcoming()}
    </div>
  );
};

export default UserBookings;
