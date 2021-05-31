const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.get("/rebates", bookingController.getRebates);
router.get("/:id", bookingController.getBookingById);
router.get("/", bookingController.getBookingsByUser);
router.post("/", bookingController.createBooking);

module.exports = router;
