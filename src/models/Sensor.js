const mongoose = require("mongoose");

const SensorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    status:
    {
      type: String,
      enum: ["on", "off"],
      default: undefined,
    },
  },
  {
    timestamps: true,
  }
);

const Sensor = mongoose.model("Sensor", SensorSchema);
module.exports = Sensor;
