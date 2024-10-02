const express = require("express");
const router = express.Router();

const { setPower } = require("../controllers/CommandController");

router.post("/",setPower);

module.exports = router;
