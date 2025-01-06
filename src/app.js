const express = require("express");
const cors = require("cors");
// eslint-disable-next-line no-unused-vars
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnect.js");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const contactRoutes = require("./routes/contactRoutes.js");
const usersRoutes = require("./routes/usersRoutes.js");
const allowedOrigins = require("./config/allowedOrigins.js");
const PORT = require("./config/port.js");
const verifyToken = require("./middlewares/authMiddleware.js");
const authorizedRoles = require("./middlewares/roleMiddleware.js");
dbConnect();

const app = express();

// ? middleware

app.use(cookieParser());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
// ? routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contact", contactRoutes);
app.use(
  "/api/users",

  usersRoutes
);

// ? start the server
app.listen(PORT, () => {
  console.log("nodeMailer is listening to http://localhost:" + PORT);
});
