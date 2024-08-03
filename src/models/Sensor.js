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
    state:
    {
      type: String,
      enum: ["ON", "OFF" , "ERROR"],
      default: "OFF",
    },
  },
  {
    timestamps: true,
  }
);

const Sensor = mongoose.model("Sensor", SensorSchema);
module.exports = Sensor;
