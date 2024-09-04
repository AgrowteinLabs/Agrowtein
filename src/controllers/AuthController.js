const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }
    const accessToken = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "60m",
      }
    );
    const refreshToken = jwt.sign(
      {
        userId: user._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "120m",
      }
    );
    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({
        message: "Logged In Successfully",
        user: user,
      });

    console.log(`${user.fullName} logged in at ${new Date().toISOString()}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An Error Occurred during Login" });
  }
};

const Refresh = async (req, res) => {
  try {
    /*const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      console.log("User request invalid");
      return res.status(401).json({ message: "Unauthorized" });
    }
    const refreshToken = authHeader.split(" ")[1];*/
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findOne({ _id: decoded.userId });
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    const accessToken = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "60m",
      }
    );
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.status(200).json({ message: "Access Token Refreshed Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Cannot Refresh Access Token." });
  }
};

const Logout = async (req, res) => {
  try {
    res
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json({ message: "Logged Out Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An Error occured on Logout." });
  }
};

module.exports = { Login, Refresh, Logout };
