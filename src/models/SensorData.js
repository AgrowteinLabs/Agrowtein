const mongoose = require("mongoose");

const sensorDataSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    phValue: {
      type: String,
    },
    temperature: {
      type: Number,
    },
    humidity: {
      type: Number,
    },
    oxygen: {
      type: String,
    },
    voltage: {
      type: String,
    },
    pressure: {
      type: String,
    },
    waterLevel: {
      type: String,
    },
    prefferedWaterLevel: {
      type: String,
    },
    weather: {
      windspeed: {
        type: String,
      },
      winddirection: {
        type: String,
      },
      weathercondition: {
        type: String,
      },
      uvindex: {
        type: String,
      },
      visibility: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const SensorData = mongoose.model("SensorData", sensorDataSchema);
module.exports = SensorData;
