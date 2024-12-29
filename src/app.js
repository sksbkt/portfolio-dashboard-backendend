const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnect.js");
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const contactRoutes = require("./routes/contactRoutes.js");
const allowedOrigins = require("./config/allowedOrigins.js");
const PORT = require("./config/port.js");
dbConnect();

const app = express();

// ? middleware

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
// ? start the server

app.listen(PORT, () => {
  console.log("nodeMailer is listening to http://localhost:" + PORT);
});
