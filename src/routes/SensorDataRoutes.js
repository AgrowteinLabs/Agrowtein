const express = require("express");
const router = express.Router();

const {
  getDataByProduct,
  getDataByDate,
  createData,
} = require("../controllers/SensorDataController");

router.get("/:productId", getDataByProduct);
router.get("/:productId/date", getDataByDate);
router.post("/", createData);

module.exports = router;
