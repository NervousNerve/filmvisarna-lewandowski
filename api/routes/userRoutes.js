const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/whoami", userController.whoami);
router.get("/logout", userController.logout);
router.get("/userbookings", userController.getBookingsByUser);
router.post("", userController.createUser);
router.post("/login", userController.login);

module.exports = router;