const express = require("express");
const handleFeedback = require("../controllers/FeedbackController");

const router = express.Router();

router.post("/feedback", handleFeedback);

module.exports = router;
