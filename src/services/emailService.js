const nodeMailer = require("nodemailer");
const transporterEmail = process.env.TRANSPORTER_GMAIL_EMAIL;
const transporterPassWord = process.env.TRANSPORTER_GMAIL_PASSWORD;

function sendEmailService(body) {
  const { firstName, lastName, email, phone, message } = body;
  return new Promise((resolve, reject) => {
    var transporter = nodeMailer.createTransport({
      service: "gmail",
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

module.exports = sendEmailService;
