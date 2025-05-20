const express = require("express");
const { GeneralBot, UserBot } = require("../controllers/BotController");
const router = express.Router();

router.post("/generalB", GeneralBot);
router.post("/UserB", UserBot);

module.exports = router;