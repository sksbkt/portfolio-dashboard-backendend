const User = require("../../models/userModel");
const bcrypt = require("bcrypt");
const { USER_REGEX, PWD_REGEX, ROLES } = require("../../utils/validations");

const registerController = async (req, res) => {
  try {
    const { username, password, roles } = req.body;
    if (!username || !password || !roles) {
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

    if (
      !Array.isArray(roles) ||
      roles.length === 0 ||
      !roles.every((role) => ROLES.includes(role))
    ) {
      return res.status(401).json({ message: "Invalid roles" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
      roles: [...roles],
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

module.exports = { registerController };
