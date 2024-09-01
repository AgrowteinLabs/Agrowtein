const User = require("../models/User");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").exec();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users data." });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select("-password")
      .exec();
    if (!user) {
      res.status(404).json({ message: "User not found." });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data." });
  }
};

const createUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email }).exec();
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json({ message: "User created successfully." });
    } else {
      res.status(409).json({ message: "User already exists." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error creating user." });
  }
};

const updateUserPassword = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.findByIdAndUpdate(req.params.userId, {
      password: hashedPassword,
    });
    res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error changing password." });
  }
};

const updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      res.status(404).json({ message: "User not found." });
    } else {
      res.status(200).json({ message: "User details updated successfully." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating user info." });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      res.status(404).json({ message: "User not found." });
    } else {
      res.status(200).json({ message: "User deleted successfully." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting user." });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserPassword,
  updateUser,
  deleteUser,
};
