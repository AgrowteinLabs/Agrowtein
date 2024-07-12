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
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["on", "off"],
      default: undefined,
    },
    location: {
      type: String,
    },
    product_type: {
      type: String,
    },
    model_number: {
      type: String,
    },
    serial_number: {
      type: String,
    },
    compatible_sensors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sensor",
      },
    ],
    usage_metrics: {
      type: String,
    },
    installation_date: {
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
