const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const refreshTokenController = async (req, res) => {
  const cookie = req.cookies;
  console.log("Cookies: ", cookie.jwt);
  if (!cookie?.jwt) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const refreshToken = cookie.jwt;
  const foundUser = await User.findOne({ refreshToken }).exec();
  // return res.status(200).json({ message: "DONE" });
  if (!foundUser) {
    return res.status(403);
  }
  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username) {
      return res.status(403);
    }
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        // UserInfo: {
        userName: foundUser.username,
        roles: roles,
        // },
      },
      process.env.JWT_SECRET,
      { expiresIn: "10s" }
    );
    res.json({ roles, accessToken });
  });
};
module.exports = { refreshTokenController };
