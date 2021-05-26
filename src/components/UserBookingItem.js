import { useContext, useEffect, useState } from "react";

const UserBookingItem = (props) => {
  const [booking, setBooking] = useState(props.booking);
  // const { booking } = props.booking;
  return (
    <div>
      {booking.seats.map((seat, i) => (
        <p>seat: {seat}</p>
      ))}
      <p>Total price: {booking.price}</p>
    </div>
  );
};

export default UserBookingItem;
