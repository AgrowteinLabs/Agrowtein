const express = require("express");
const router = express.Router();

const {
  getDataByUid,
  getDataByDate,
  createData,
  getLatestData,
} = require("../controllers/ProductDataController");
const { verifyJWT } = require("../middleware/verifyJWT");

router.get("/:uid", verifyJWT, getDataByUid);
router.get("/:uid/date", verifyJWT, getDataByDate);
router.post("/:uid", createData);
router.get("/realtime/:uid", getLatestData);

module.exports = router;
