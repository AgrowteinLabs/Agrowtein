const express = require("express");
const router = express.Router();

const {
  getDataByUid,
  getDataByDate,
  createData,
  getLatestData,
  getSensorStatus,
} = require("../controllers/ProductDataController");

router.get("/:uid", getDataByUid);
router.post("/:uid/date", getDataByDate);
router.post("/:uid", createData);
router.get("/realtime/:uid", getLatestData);
router.get("/status/:uid", getSensorStatus);

module.exports = router;
