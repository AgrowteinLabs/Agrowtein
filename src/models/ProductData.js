const mongoose = require("mongoose");

const productDataSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    timestamp: { type: Date, default: new Date() },
    data: { type: Map, of: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

productDataSchema.pre("save", async function (next) {
  try {
    const userProduct = await mongoose.model("UserProduct").findOne({ uid: this.uid })
      .populate("sensors.sensorId")
      .exec();

    if (!userProduct) {
      throw new Error("UserProduct not found.");
    }

    for (const [key, value] of this.data.entries()) {
      const sensorEntry = userProduct.sensors.find(
        (s) => s.sensorId.name.toLowerCase() === key.toLowerCase()
      );

      if (sensorEntry) {
        const sensor = sensorEntry.sensorId;

        if (
          value === sensor.errorCode ||
          value === null ||
          value === undefined
        ) {
          sensorEntry.state = "ERROR";
          this.data.delete(key);
        } else {
          sensorEntry.state = "ON";
        }
      }
    }

    const allSensorStates = userProduct.sensors.map((s) => s.state);
    if (allSensorStates.includes("ERROR")) {
      userProduct.state = "ERROR";
    } else if (allSensorStates.every((s) => s === "ON")) {
      userProduct.state = "ON";
    } else {
      userProduct.state = "OFF";
    }

    await userProduct.save();
    next();
  } catch (error) {
    console.error("Error updating sensor states:", error);
    next(error);
  }
});

const ProductData = mongoose.model("ProductData", productDataSchema);
module.exports = ProductData;
