import { useState, useEffect } from "react";
// import Footer from '../components/Footer'
// import { CartContext } from "../contexts/CartContext"
import styles from "../css/ConfirmationPage.module.css";
// import footerstyle from '../css/Footer.module.css'

const ConfirmationPage = (props) => {
  const [booking, setBooking] = useState();
  const { id } = props.match.params;

  const getBookingById = async (id) => {
    let booking = await fetch(`/api/v1/bookings/${id}`);
    booking = await booking.json();
    setBooking(booking);
  };

  useEffect(() => {
    getBookingById(id);
  }, [id]);
  // const { orderDetails } = useContext(CartContext)

  if (!booking) {
    return null;
  }

  return (
    <div>
      <div className={styles.confirmation}>
        {/* <img className={styles.logo} src="/assets/images/logo.svg" alt="Logo" /> */}
        <img
          className={styles.confirm}
          src="/assets/icons/confirm.svg"
          alt="confirm icon"
        />
        <div className={styles.thanks}>
          <h1>Thank's for booking with FunkyFilm!</h1>
          <p>Booking confirmation</p>
        </div>

        <div className={styles.details}>
          {/* <h4>Order details:</h4> */}
          <div className={styles.orderDetails}>
            {/* <div className={styles.detailsLeft}>
              <p>Booking Number: {booking._id}</p>
              <p>Price: {booking.price}</p>
              <p>Date/Time: {booking.screeningId.date}</p>
              <p>Seat/Row: {booking.seats.join(", ")}</p>
              <p>
                Film description: {booking.screeningId.movieId.title},{" "}
                {booking.screeningId.movieId.plot}
              </p>
            </div> */}
            <div className={styles.detailsLeft}>
              <p>Booking Number:</p>
              <p>Price:</p>
              <p>Date/Time:</p>
              <p>Seat/Row:</p>
              <p>Film description:</p>
            </div>
            <div className={styles.detailsRight}>
              <p> {booking._id}</p>
              <p> {booking.price} kr</p>
              <p> {booking.screeningId.date}</p>
              <p> {booking.seats.join(", ")}</p>
              <p> {booking.screeningId.movieId.title}</p>
              <p className={styles.plot}> {booking.screeningId.movieId.plot}</p>
              {/* <p> {booking.seats}</p> */}
            </div>
          </div>

          {/* <h4>Car details:</h4> */}
          {/* {orderDetails.cart.map((c, i) => (
            <div key={i} className={`${styles.carDetails} ${styles.carDetailsC}`}>
              <div className={styles.detailsLeft}>
                <p className={styles.left}>Article Number</p>
                <p className={styles.left}>Make, Model:</p>
                <p className={styles.left}>Price:</p>
              </div>
              <div className={styles.detailsRight} key={c.vin}>
                <p className={styles.right}>{c.vin}</p>
                <p className={styles.right}>{`${c.make} ${c.model}`}</p>
                <p className={styles.right}>{c.price} Kr</p>
              </div>
            </div>
          ))} */}
        </div>
        {/* <div className={styles.information}>
          <p>Oraganisation number : <span> 0000000</span></p>
          <p>Email : <span> info@Carall.se</span></p>
          <p>Telephone : <span> +46 000 000 00</span></p>
          <p>Address : <span> Adresslane 22A 21 2211 Stockholm</span></p>
        </div> */}

        <div className={styles.printButton}>
          {/* <button className={styles.print} onClick={() => window.print()}>
            Print
          </button> */}
          <button className={styles.backhome}>Back to Home</button>

          {/* <img
            className={styles.printIcon}
            src="assets/icons/print.svg"
            alt="print-icon"
          /> */}
        </div>
        <div></div>
      </div>
      {/* <div className={footerstyle.sticky}>
        <Footer />
      </div> */}
    </div>
  );
};

export default ConfirmationPage;
