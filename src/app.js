const express = require("express");
const nodeMailer = require("nodemailer");
const cors = require("cors");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnect.js");
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
dbConnect();

const app = express();

// ? middleware

app.use(express.json());

// ? routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
// ? start the server
// const port = 5000;
const port = process.env.PORT || 7002;

const transporterEmail = process.env.TRANSPORTER_GMAIL_EMAIL;
const transporterPassWord = process.env.TRANSPORTER_GMAIL_PASSWORD;

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  //   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

function sendEmail(body) {
  const { firstName, lastName, email, phone, message } = body;
  return new Promise((resolve, reject) => {
    var transporter = nodeMailer.createTransport({
      service: "gmail.com",
      auth: { user: transporterEmail, pass: transporterPassWord },
    });
    const mail_configs = {
      from: email,
      to: transporterEmail,
      subject: `${body.firstName} ${body.lastName}`,
      text: `You have received a new message:\n\n
        Name: ${firstName} ${lastName}\n
        Email: ${email}\n
        Phone: ${phone}\n
        Message:\n
            ${message}`,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: "an error has been occurred" });
      }
      return resolve({ message: "Email sent successfully" });
    });
  });
}

app.post("/contact", (req, res) => {
  console.log(req.body);

  sendEmail(req.body)
    .then((response) => {
      return res.send(response.message);
    })
    .catch((error) => {
      return res.status(500).send(error.message);
    });
});

app.listen(port, () => {
  console.log("nodeMailer is listening to http://localhost:" + port);
});
