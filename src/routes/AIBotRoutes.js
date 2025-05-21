const express = require("express");
const { GeneralBot, UserBot, CreateReport } = require("../controllers/BotController");
const router = express.Router();

router.post("/generalB", GeneralBot);
router.post("/report/:uid", CreateReport);
router.post("/UserB", UserBot);

module.exports = router;