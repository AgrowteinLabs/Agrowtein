const SensorData = require("../models/SensorData");

const getDataByProduct = async (req, res) => {
  try {
    const data = await SensorData.find({
      productId: req.params.productId,
    }).exec();
    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching data." });
  }
};

const getDataByDate = async (req, res) => {
  try {
    const data = await SensorData.find({
      timestamp: { $gte: req.body.startDate, $lte: req.body.endDate },
      productId: req.params.productId,
    }).exec();
    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching data." });
  }
};

const createData = async (req, res) => {
  try {
    const data = new SensorData(req.body);
    await data.save();
    res.status(201).json({ message: "Data created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating data." });
  }
};

const updatePrefferedWaterLevel = async (req, res) => {
  try {
    const data = await SensorData.updateMany(
      { productId: req.params.productId },
      { $set: req.body }
    );
    res.status(200).json({ message: "Data updated successfully." });
  } catch (err) {
    res.status(500).json({ message: "Error updating data." });
  }
};

module.exports = {
  getDataByProduct,
  getDataByDate,
  createData,
  updatePrefferedWaterLevel,
};
