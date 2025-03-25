const express = require("express");
const router = express.Router();

const { setPower, setControls } = require("../controllers/CommandController");

router.post("/setPower", setPower);
router.post("/controls", setControls);

module.exports = router;
