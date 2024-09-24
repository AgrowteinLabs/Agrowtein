const Sensor = require("../models/Sensor");
const UserProduct = require("../models/UserProduct");

const getUserProducts = async (req, res) => {
  try {
    const userProducts = await UserProduct.find({ userId: req.params.userId })
      .populate("productId sensors.sensorId")
      .exec();
    res.status(200).json(userProducts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user products data." });
  }
};

const getUserProductByUid = async (req, res) => {
  try {
    const userProduct = await UserProduct.findOne({ uid: req.params.uid })
      .populate("productId sensors.sensorId")
      .exec();
    if (!userProduct) {
      return res.status(404).json({ message: "User product not found." });
    }
    res.status(200).json(userProduct);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user product data." });
  }
};

const createUserProduct = async (req, res) => {
  try {
    const { userId, productId, uid, alias, location, sensors, controls } =
      req.body;
    const existingUserProduct = await UserProduct.findOne({ uid }).exec();
    if (existingUserProduct) {
      return res
        .status(409)
        .json({ message: "User product with the same UID already exists." });
    }
    const sensorIds = sensors.map((sensor) => sensor.sensorId);
    const sensorObjects = await Sensor.find({ _id: { $in: sensorIds } }).exec();
    if (!sensorObjects || sensorObjects.length !== sensorIds.length) {
      return res.status(400).json({ message: "Invalid sensor IDs provided." });
    }
    const sensorStates = sensorObjects.map((sensor) => ({
      sensorId: sensor._id,
      state: "OFF",
    }));
    const newUserProduct = new UserProduct({
      userId,
      productId,
      uid,
      alias,
      location,
      sensors: sensorStates,
      controls,
    });
    await newUserProduct.save();
    res.status(201).json({ message: "User product created successfully." });
  } catch (error) {
    console.error("Error creating user product:", error);
    res
      .status(500)
      .json({ message: "Error creating user product.", error: error.message });
  }
};

const updateUserProduct = async (req, res) => {
  try {
    const { alias, location, sensors, controls } = req.body;
    const userProduct = await UserProduct.findOne({uid: req.params.uid }).exec();
    if (!userProduct) {
      return res.status(404).json({ message: "User product not found." });
    }
    if (location) userProduct.location = location;
    if (alias) userProduct.alias = alias;
    if (sensors) {
      const sensorObjects = await Sensor.find({ _id: { $in: sensors } }).exec();
      const sensorStates = sensorObjects.map((sensor) => ({
        sensorId: sensor._id,
        state: "OFF",
      }));
      userProduct.sensors = sensorStates;
    }
    if (controls) {
      userProduct.controls = controls;
    }
    await userProduct.save();
    res.status(200).json({ message: "User product updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error updating user product." });
  }
};

const deleteUserProduct = async (req, res) => {
  try {
    const deletedProduct = await UserProduct.findByIdAndDelete(
      req.params.productId
    );
    if (!deletedProduct) {
      res.status(404).json({ message: "User product not found." });
    } else {
      res.status(200).json({ message: "User product deleted successfully." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting user product." });
  }
};

module.exports = {
  getUserProducts,
  getUserProductByUid,
  createUserProduct,
  updateUserProduct,
  deleteUserProduct,
};
