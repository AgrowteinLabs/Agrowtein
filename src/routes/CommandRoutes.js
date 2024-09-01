const express = require("express");
const router = express.Router();

const { sendCommand } = require("../controllers/CommandController");

router.post("/", sendCommand);

module.exports = router;
