const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/whoami", userController.whoami);
router.get("/logout", userController.logout);
router.post("/login", userController.login);
router.post("/", userController.createUser);
router.delete("/:id", userController.deleteUser);
router.put("/", userController.editUser);

module.exports = router;
