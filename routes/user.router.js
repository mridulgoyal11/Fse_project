const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
//const { authenticateUser } = require("../middlewares/auth.middleware");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
//router.get("/profile", authenticateUser, userController.getProfile);
router.get("/", userController.getAllUsers);

//router.put("/profile", authenticateUser, userController.updateProfile);

module.exports = router;
