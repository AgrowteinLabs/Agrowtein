const express = require("express");
const router = express.Router();
const { AddMockData } = require("../controllers/MockDataContoller");

router.post("/",AddMockData);

module.exports = router;
