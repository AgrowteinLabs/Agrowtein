const mongoose = require("mongoose");

const userProductSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    uid: { type: String, required: true, unique: true, maxlength: 6 },
    alias: { type: String, required: true, unique: true },
    state: { type: String, enum: ["ON", "OFF", "ERROR"], default: "OFF" },
    location: { type: String },
    installationDate: { type: Date, default: Date.now() },
    sensors: [
      {
        sensorId: { type: mongoose.Schema.Types.ObjectId, ref: "Sensor" },
        state: { type: String, enum: ["ON", "OFF", "ERROR"], default: "OFF" },
      },
    ],
    controls: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

const UserProduct = mongoose.model("UserProduct", userProductSchema);
module.exports = UserProduct;