const User = require("../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  try {
    const { username, password, roles } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const foundUser = await User.findOne({ username }).exec();
    if (!foundUser) {
      return res.status(404).json({ message: `User ${username} not found!` });
    }
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { id: foundUser._id, roles: foundUser.roles },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "1d" }
    );
    foundUser.refreshToken = refreshToken;
    const result = foundUser.save();
    console.log(result, { accessToken, refreshToken });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(200).json({ roles, accessToken });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  loginController,
};
