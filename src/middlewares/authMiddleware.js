const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Access denied" });
    }
    console.log("token", token);

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decode;
      next();
    } catch (error) {
      console.log(error.message);

      return res.status(401).json({ message: error.message });
    }
  } else {
    return res.status(401).json({ message: "No token, Access denied" });
  }
};

module.exports = verifyToken;
