const express = require("express");
const { signMqttUrl } = require("../controllers/mqtt.controller");

const router = express.Router();

router.get("/sign-mqtt-url", signMqttUrl);

module.exports = router;
