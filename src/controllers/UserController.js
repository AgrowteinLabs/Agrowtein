const User = require("../models/User");
const bcrypt = require("bcrypt");

const usernewpassword = async (req, res) => {
  try {
    const password = req.body.password;
    const hashpassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(req.params.user_id, {
      password: hashpassword,
    });
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error changing password" });
  }
};

const deleteuser = async () => {
  try {
    await User.findByIdAndDelete(req.params.user_id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
};

module.exports = { usernewpassword, deleteuser };
