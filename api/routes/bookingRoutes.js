const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.get("/bookings", bookingController.getBookingsByUser);

module.exports = router;
