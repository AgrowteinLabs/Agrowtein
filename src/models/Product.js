const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
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
    },
    compatibleSensors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sensor",
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

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
