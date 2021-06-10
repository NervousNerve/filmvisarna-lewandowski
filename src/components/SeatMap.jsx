import { useEffect } from "react";

//This component is for testing seatMap logic in Booking component only.
//Should be deleted/overwritten once the real seatMap component is completed.

const SeatMap = ({ screening }) => {
  // useEffect(() => {
  //   console.log("from seatmap component", screening);
  // }, [screening]);

  return (
    <div>
      <h2>
        SEATMAP HERE
        {screening._id}
      </h2>
    </div>
  );
};

export default SeatMap;
