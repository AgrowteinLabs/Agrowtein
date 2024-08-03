const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    state: {
      type: String,
      enum: ["ON", "OFF", "ERROR"],
      default: "OFF",
    },
    location: {
      type: String,
    },
    productType: {
      type: String,
    },
    modelNumber: {
      type: String,
    },
    serialNumber: {
      type: String,
      required: true,
    },
    sensor: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Sensor",
        },
        state: {
          type: String,
          enum: ["ON", "OFF", "ERROR"],
          default: "OFF",
        },
      },
    ],
    usageMetrics: {
      type: String,
    },
    installationDate: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
