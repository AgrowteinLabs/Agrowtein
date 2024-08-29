const express = require("express");
const router = express.Router();

const {
  getDataByProduct,
  getDataByDate,
  createData,
  updatePrefferedWaterLevel,
} = require("../controllers/SensorDataController");

router.get("/:productId", getDataByProduct);
router.get("/:productId/date", getDataByDate);
router.post("/", createData);
router.put("/:productId", updatePrefferedWaterLevel);

module.exports = router;
