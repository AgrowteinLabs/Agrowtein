const mongoose = require("mongoose");
mongoose.set("strictQuery", true, "useNewUrlParser", true);
DB_URI = process.env.MONGODB_URI

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
