const mongoose = require("mongoose");

const SensorDataSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    value: {
      type: String,
    },
    weather: {
      temperature: {
        type: String,
      },
      humidity: {
        type: String,
      },
      pressure: {
        type: String,
      },
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

const SensorData = mongoose.model("SensorData", SensorDataSchema);
module.exports = SensorData;
