const express = require("express");
const router = express.Router();
const screeningController = require("../controllers/screeningController");

// TEST route
// router.get("/", screeningController.getScreenings);

router.get("/:id", screeningController.getScreenings);
module.exports = router;
