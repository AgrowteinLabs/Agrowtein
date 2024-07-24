const express = require("express");
const router = express.Router();
const {
  getSensors,
  getSensorById,
  createSensor,
  updateSensor,
  deleteSensor,
} = require("../controllers/SensorController");

router.get("/", getSensors);
router.get("/:sensorId", getSensorById);
router.post("/", createSensor);
router.put("/:sensorId", updateSensor);
router.delete("/:sensorId", deleteSensor);

module.exports = router;
