const express = require("express");
const { loginController } = require("../controllers/auth/loginController");
const {
  registerController,
} = require("../controllers/auth/registerController");
const {
  refreshTokenController,
} = require("../controllers/auth/refreshTokenController");
const { logoutController } = require("../controllers/auth/logoutController");

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/logout", logoutController);
router.get("/refresh", refreshTokenController);

module.exports = router;
