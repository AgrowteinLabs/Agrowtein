const express = require("express");
const router = express.Router();
const {
  AddMockData,
  getMockData,
  getCommand,
} = require("../controllers/MockDataContoller");

router.get("/", getMockData);
router.post("/", AddMockData);
router.get("/command", getCommand);

module.exports = router;
