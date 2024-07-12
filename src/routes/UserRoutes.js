const express = require("express");
const router = express.Router();
const {
  usernewpassword,
  deleteuser,
} = require("../controllers/UserController");

router.post("/:user_id/newpassword", usernewpassword);
router.delete("/:user_id/deleteuser", deleteuser);

module.exports = router;
