const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/userbookings", userController.getBookingsByUser);

module.exports = router;
