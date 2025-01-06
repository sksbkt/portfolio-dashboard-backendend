const express = require("express");
const usersController = require("../controllers/usersController");
const verifyToken = require("../middlewares/authMiddleware");
const authorizedRoles = require("../middlewares/roleMiddleware");

const router = express.Router();

// Get all users
router.get(
  "/",
  verifyToken,
  authorizedRoles("admin", "manager", "user"),
  usersController.getAllUsers
);

// Get a single user by ID
router.get("/:id", usersController.getUserById);

// Create a new user
router.post("/", usersController.createUser);

// Update a user by ID
router.put("/:id", usersController.updateUser);

// Delete a user by ID
router.delete("/:id", usersController.deleteUser);

module.exports = router;
