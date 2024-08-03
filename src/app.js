require("dotenv").config({ path: "src/config/.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logger");
const { errorHandler, logError } = require("./middleware/errorHandler");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const port = process.env.PORT || 4500;

connectDB();
app.use(logger());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

const UserRoutes = require("./routes/UserRoutes");
const ProductRoutes = require("./routes/ProductRoutes");
const SensorRoutes = require("./routes/SensorRoutes");
const SensorDataRoutes = require("./routes/SensorDataRoutes");
const MockDataRoutes = require("./routes/MockDataRoute");

app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/products", ProductRoutes);
app.use("/api/v1/sensors", SensorRoutes);
app.use("/api/v1/data", SensorDataRoutes);
app.use("/api/v1/mockdata", MockDataRoutes);

mongoose.connection.once("open", () => {
  console.log("Database connected successfully.");
  app
    .listen(port, () => {
      console.log(`Server is running on port ${port}`);
    })
    .on("error", (err) => {
      console.error("Error starting server:", err);
      logError(err);
    });
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to database", err);
  logError(err);
});

module.exports = app;
