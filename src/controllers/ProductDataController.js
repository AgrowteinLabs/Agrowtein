const ProductData = require("../models/ProductData");
const UserProduct = require("../models/UserProduct");

const getDataByUid = async (req, res) => {
  try {
    const data = await ProductData.find({ uid: req.params.uid }).exec();
    if (!data || data.length === 0) {
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
    const data = await ProductData.find({
      timestamp: { $gte: req.body.startDate, $lte: req.body.endDate },
      uid: req.params.uid,
    }).exec();
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Data not found." });
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching data." });
  }
};

const createData = async (req, res) => {
  try {
    const userProduct = await UserProduct.findOne({ uid: req.params.uid }).exec();
    if (!userProduct) {
      return res.status(404).json({ message: "UserProduct not found." });
    }
    const newData = new ProductData({
      ...req.body,
      uid: req.params.uid,
    });
    await newData.save();
    res.status(201).json({ message: "Data created successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating data.", error: error.message });
  }
};

module.exports = {
  getDataByUid,
  getDataByDate,
  createData,
};
