const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/admin", verifyToken, (req, res) => {
  res.json({ message: "welcome to admin page" });
});

router.get("/manager", (req, res) => {
  res.json({ message: "welcome to manager page" });
});

router.get("/user", (req, res) => {
  res.json({ message: "welcome to user page" });
});

module.exports = router;
