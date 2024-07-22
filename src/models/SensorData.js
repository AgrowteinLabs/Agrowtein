const mongoose = require("mongoose");

const SensorDataSchema = new mongoose.Schema(
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
    value: {
      type: String,
    },
    weather: {
      temperature: {
        //type Long not supported
        type: String,
      },
      voltage: {
        type: String,
      },
      pressure: {
        type: String,
      },
      waterlevel: {
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
