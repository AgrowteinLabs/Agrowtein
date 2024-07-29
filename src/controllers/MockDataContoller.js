const MockData = require("../models/MockData");

const AddMockData = async (req, res) => {
  try {
    const data = new MockData({
      temperature: req.body.temperature,
      humidity: req.body.humidity,
    });
    await data.save();
    res.status(201).json({ message: "Data created successfully." });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Error saving Data." });
  }
};

module.exports = {
  AddMockData,
};
