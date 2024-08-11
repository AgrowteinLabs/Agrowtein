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

const getMockData = async (req, res) => {
  try {
    const data = await MockData.find();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Error fetching Data." });
  }
};

const getCommand = async (req, res) => {
  try {
    const message = "on";
    setTimeout(() => {
      message = "off";
    }, 10000);
    res.status(200).json({ message: message });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Error fetching Data." });
  }
};

module.exports = {
  AddMockData,
  getMockData,
  getCommand,
};
