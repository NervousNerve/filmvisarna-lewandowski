const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.get("/:id", bookingController.getBookingById);
router.get("/userbookings", bookingController.getBookingsByUser);
router.post("/", bookingController.createBooking);

module.exports = router;