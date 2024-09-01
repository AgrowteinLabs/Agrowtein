const express = require("express");
const router = express.Router();

const {
  getDataByUid,
  getDataByDate,
  createData,
} = require("../controllers/ProductDataController");

router.get("/:productId", getDataByUid);
router.get("/:productId/date", getDataByDate);
router.post("/:uid", createData);

module.exports = router;
