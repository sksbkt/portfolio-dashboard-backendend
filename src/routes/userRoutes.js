const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const authorizedRoles = require("../middlewares/roleMiddleware");
const router = express.Router();

router.get("/admin", verifyToken, authorizedRoles("admin"), (req, res) => {
  res.json({ message: "welcome to admin page" });
});

router.get(
  "/manager",
  verifyToken,
  authorizedRoles("admin", "manager"),
  (req, res) => {
    res.json({ message: "welcome to manager page" });
  }
);

router.get(
  "/user",
  verifyToken,
  authorizedRoles("admin", "manager", "user"),
  (req, res) => {
    res.json({ message: "welcome to user page" });
  }
);

module.exports = router;
