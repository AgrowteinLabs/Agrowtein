const ProductData = require("../models/ProductData");
const UserProduct = require("../models/UserProduct");

const getDataByUid = async (req, res) => {
  try {
    console.log("Received UID:", req.params.uid);
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
    console.log("Received UID:", req.params.uid);
    const data = await ProductData.find({
      timestamp: { $gte: req.body.startDate, $lte: req.body.endDate },
      uid: req.params.uid,
    })
      .sort({ timestamp: 1 })
      .select("data timestamp")
      .exec();

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Data not found." });
    }

    const filterByThirtyMinutes = (data) => {
      const result = [];
      let lastTimestamp = null;

      data.forEach((entry) => {
        if (!lastTimestamp || entry.timestamp - lastTimestamp >= 30 * 60 * 1000) {
          result.push(entry);
          lastTimestamp = entry.timestamp;
        }
      });

      return result;
    };

    const filteredData = filterByThirtyMinutes(data);

    if (filteredData.length === 0) {
      return res.status(404).json({ message: "No data found in 30-minute intervals." });
    }

    res.status(200).json(filteredData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data." });
  }
};

const getLatestData = async (req, res) => {
  try {
    console.log("Received UID:", req.params.uid);
    const data = await ProductData.findOne({ uid: req.params.uid })
      .sort({ timestamp: -1 })
      .exec();
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
    console.log("Received UID:", req.params.uid);
    const userProduct = await UserProduct.findOne({
      uid: req.params.uid,
    }).exec();
    if (!userProduct) {
      return res.status(404).json({ message: "UserProduct not found." });
    }
    const newData = new ProductData({
      data: req.body,
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

const getSensorStatus = async (req, res) => {
  try {
    console.log("Received UID:", req.params.uid);

    const data = await ProductData.findOne({ uid: req.params.uid })
      .sort({ timestamp: -1 })
      .exec();

    if (!data) {
      console.log("No data found for UID:", req.params.uid);
      return res.status(404).json({ message: `No data found for UID: ${req.params.uid}` });
    }

    const plainData = data.toObject();

    const currentTime = new Date();
    const dataTimestamp = new Date(plainData.timestamp);
    const timeDifference = (currentTime - dataTimestamp) / (1000 * 60); 

    if (timeDifference > 5) {
      console.log("Data is older than 5 minutes. Marking all sensors as inactive.");

      const sensorData = plainData.data instanceof Map ? Object.fromEntries(plainData.data) : plainData.data;

      const sensorStatus = Object.entries(sensorData).map(([sensorName, value]) => ({
        name: sensorName,
        value,
        status: "inactive",
      }));

      return res.status(200).json(sensorStatus);
    }

    const sensorData = plainData.data instanceof Map ? Object.fromEntries(plainData.data) : plainData.data;

    const sensorStatus = Object.entries(sensorData).map(([sensorName, value]) => {
      const status = typeof value === "string" && value.includes("-er") ? "inactive" : "active";
      return {
        name: sensorName,
        value,
        status,
      };
    });

    res.status(200).json(sensorStatus);
  } catch (error) {
    console.error("Error fetching sensor status:", error);
    res.status(500).json({ message: "Error fetching sensor status." });
  }
};

const getIntervalData = async (req, res) => {
  try {
    const { uid } = req.params;
    const { startDate, endDate, interval = 30 } = req.query;

    const intervalMs = parseInt(interval) * 60 * 1000;

    const data = await ProductData.aggregate([
      {
        $match: {
          uid,
          timestamp: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $sort: { timestamp: 1 },
      },
      {
        $group: {
          _id: {
            $toLong: {
              $subtract: [
                { $toLong: "$timestamp" },
                { $mod: [{ $toLong: "$timestamp" }, intervalMs] }
              ]
            }
          },
          data: { $first: "$data" },
          timestamp: { $first: "$timestamp" }
        }
      },
      {
        $sort: { timestamp: 1 },
      },
    ]);

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No data found in given interval." });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Interval Fetch Error:", error);
    res.status(500).json({ message: "Server error fetching interval data." });
  }
};


module.exports = {
  getDataByUid,
  getDataByDate,
  createData,
  getLatestData,
  getSensorStatus,
  getIntervalData,

};
