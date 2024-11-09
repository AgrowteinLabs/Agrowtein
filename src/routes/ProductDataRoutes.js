const express = require("express");
const router = express.Router();

const {
  getDataByUid,
  getDataByDate,
  createData,
  getLatestData,
} = require("../controllers/ProductDataController");

router.get("/:uid", getDataByUid);
router.post("/:uid/date", getDataByDate);
router.post("/:uid", createData);
router.get("/realtime/:uid", getLatestData);

module.exports = router;
