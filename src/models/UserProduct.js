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
    controls: [
      {
        type: Map,
        of: new mongoose.Schema({
          controlId: {
            type: String,
            required: true,
            unique: true,
            minlength: 3,
            maxlength: 6,
          },
          name: { type: String, required: true },
          min: { type: Number, required: true },
          max: { type: Number, required: true },
          threshHold: {
            type: Number,
            required: true,
            validate: {
              validator: function (value) {
                return value <= this.max && value >= this.min;
              },
              message: (props) =>
                `Threshold value (${props.value}) should be between min (${props.instance.min}) and max (${props.instance.max})`,
            },
          },
          bypass: { type: Boolean, default: false },
          automate: {
            type: Boolean,
            default: true,
          },
          state: {
            type: String,
            enum: ["ON", "OFF", "ERROR"],
            default: "OFF",
          },
        }),
      },
    ],
  },
  { timestamps: true }
);

const UserProduct = mongoose.model("UserProduct", userProductSchema);
module.exports = UserProduct;
