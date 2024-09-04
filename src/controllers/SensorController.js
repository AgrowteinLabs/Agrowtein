const Sensor = require("../models/Sensor");
const UserProduct = require("../models/UserProduct");

const getSensors = async (req, res) => {
  try {
    const sensors = await Sensor.find().exec();
    if (!sensors) {
      res.status(404).json({ message: "No sensors found" });
    } else {
      res.status(200).json(sensors);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error fetching sensors data" });
  }
};

const getSensorsByuid = async (req, res) => {
  try {
    const userProduct = await UserProduct.findOne({
      uid: req.params.uid,
    }).exec();
    if (!userProduct) {
      return res.status(404).json({ message: "UserProduct not found" });
    }
    const sensors = await Sensor.find({
      _id: { $in: userProduct.sensors.map((s) => s.sensorId) },
    }).exec();
    res.status(200).json(sensors);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error fetching sensors data" });
  }
};

const getSensorById = async (req, res) => {
  try {
    const sensor = await Sensor.findById(req.params.sensorId).exec();
    if (!sensor) {
      res.status(404).json({ message: "Sensor not found" });
    } else {
      res.status(200).json(sensor);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error fetching sensor data" });
  }
};

const createSensor = async (req, res) => {
  try {
    const sensor = await Sensor.findOne({ name: req.body.name });
    if (!sensor) {
      const newSensor = new Sensor(req.body);
      await newSensor.save();
      res.status(201).json({ message: "Sensor created successfully." });
    } else {
      res.status(400).json({ message: "Sensor already exists" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error creating sensor" });
  }
};

const updateSensor = async (req, res) => {
  try {
    const sensor = await Sensor.findByIdAndUpdate(
      req.params.sensorId,
      req.body
    ).exec();
    if (!sensor) {
      res.status(404).json({ message: "Sensor not found" });
    } else {
      res.status(200).json({ message: "Sensor updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating sensor" });
  }
};

const deleteSensor = async (req, res) => {
  try {
    const sensor = await Sensor.findByIdAndDelete(req.params.sensorId).exec();
    if (!sensor) {
      res.status(404).json({ message: "Sensor not found" });
    } else {
      res.status(200).json({ message: "Sensor deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting sensor" });
  }
};

module.exports = {
  getSensors,
  getSensorById,
  createSensor,
  updateSensor,
  deleteSensor,
  getSensorsByuid,
};
