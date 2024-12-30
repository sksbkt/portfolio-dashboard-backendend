const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { USER_REGEX, PWD_REGEX, ROLES } = require("../utils/validations");

const registerController = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Validate username
    if (!USER_REGEX.test(username)) {
      return res.status(400).json({
        message:
          "Username must start with a letter and can contain letters, numbers, hyphens, or underscores. Length should be 4-24 characters.",
      });
    }

    // Validate password
    if (!PWD_REGEX.test(password)) {
      return res.status(400).json({
        message:
          "Password must be 8-24 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%).",
      });
    }

    // Validate role
    if (!ROLES.includes(role)) {
      return res.status(400).json({
        message: "Role is not valid",
      });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
      role,
    });
    await user.save();
    res
      .status(201)
      .json({ message: `User registered with username: ${username}` });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const loginController = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: `User ${username} not found!` });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  registerController,
  loginController,
};
