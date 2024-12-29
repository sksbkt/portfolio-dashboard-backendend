const express = require("express");
const { sendEmailController } = require("../controllers/contactController");
const router = express.Router();

router.post("/email", sendEmailController);

module.exports = router;
