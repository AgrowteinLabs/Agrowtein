const mongoose = require("mongoose");
const mockDataSchema = new mongoose.Schema(
  {
    temperature: {
      type: Number,
      required: true,
    },
    humidity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const MockData = mongoose.model("MockData", mockDataSchema);
module.exports = MockData;
