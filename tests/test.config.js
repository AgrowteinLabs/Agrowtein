const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.env" });

const configureTest = () => {

  beforeAll(async () => {
    await mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => console.log("Databse connected successfully."));
  });

  afterAll(async () => {
    await mongoose.connection
      .close()
      .then(() => console.log("Database disconnected."));
  });
};

module.exports = configureTest;
