const express = require("express");
const router = express.Router();

const {
  getDataByUid,
  getDataByDate,
  createData,
} = require("../controllers/ProductDataController");

router.get("/:uid", getDataByUid);
router.get("/:uid/date", getDataByDate);
router.post("/:uid", createData);

module.exports = router;
