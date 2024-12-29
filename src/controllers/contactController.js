const sendEmailService = require("../services/emailService");
const sendEmailController = (req, res) => {
  sendEmailService(req.body)
    .then((response) => {
      return res.send(response.message);
    })
    .catch((error) => {
      return res.status(500).send(error.message);
    });
};
module.exports = { sendEmailController };
