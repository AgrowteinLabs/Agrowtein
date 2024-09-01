const mongoose = require("mongoose");

const sensorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    unit: { type: String, required: true },
    errorCode: { type: String, required: true },
  },
  { timestamps: true }
);

const Sensor = mongoose.model("Sensor", sensorSchema);
module.exports = Sensor;
