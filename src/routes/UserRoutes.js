const express = require("express");
const router = express.Router();
const {
  userNewPassword,
  deleteUser,
  getUsers,
  getUserById,
  createUser,
  updateUser,
} = require("../controllers/UserController");

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.post("/", createUser);
router.post("/:userId/newpassword", userNewPassword);
router.put("/:userid", updateUser);
router.delete("/:userId", deleteUser);

module.exports = router;
