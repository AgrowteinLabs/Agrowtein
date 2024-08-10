const express = require("express");
const router = express.Router();
const { AddMockData , getMockData } = require("../controllers/MockDataContoller");

router.get("/", getMockData )
router.post("/",AddMockData);
router.get("/command",)

module.exports = router;
