require("dotenv").config({ path: "src/config/.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logger");
const { errorHandler, logError } = require("./middleware/errorHandler");
const { verifyJWT } = require("./middleware/verifyJWT");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = require("./config/swaggerOptions");
const specs = swaggerJsdoc(options);
const port = process.env.PORT || 4500;

connectDB();
app.use(logger());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(errorHandler);

const AuthRoutes = require("./routes/AuthRoutes");
const UserRoutes = require("./routes/UserRoutes");
const ProductRoutes = require("./routes/ProductRoutes");
const SensorRoutes = require("./routes/SensorRoutes");
const ProductDataRoutes = require("./routes/ProductDataRoutes");
const UserProductRoutes = require("./routes/UserProductRoutes");
const CommandRoutes = require("./routes/CommandRoutes");
const FeedbackRoutes = require("./routes/FeedbackRoutes");
const AIBotRoutes = require("./routes/AIBotRoutes");
const mqttRoute = require("./routes/mqtt.route");


app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/products", ProductRoutes);
app.use("/api/v1/sensors", SensorRoutes);
app.use("/api/v1/user/product", UserProductRoutes);
app.use("/api/v1/data", ProductDataRoutes);
app.use("/api/v1/command", CommandRoutes);
app.use("/api/v1/feedback", FeedbackRoutes);
app.use("/api/v1/bot", AIBotRoutes);
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api", mqttRoute);


app.get("/health", (req, res) => {
  const data = {
    uptime: process.uptime(),
    message: "Ok",
    date: new Date(),
  };

  res.status(200).send(data);
});

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
