const express = require("express");
const router = express.Router();
const {
  getSensors,
  getSensorById,
  createSensor,
  updateSensor,
  deleteSensor,
  getSensorsByuid,
} = require("../controllers/SensorController");

router.get("/", getSensors);
router.get("/:sensorId", getSensorById);
router.get("/uid/:uid", getSensorsByuid);
router.post("/", createSensor);
router.put("/:sensorId", updateSensor);
router.delete("/:sensorId", deleteSensor);

module.exports = router;
