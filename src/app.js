require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logger");
const { errorHandler } = require("./middleware/errorHandler");
const port = process.env.PORT || 4500;

app.use(logger());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

const UserRoutes = require("./routes/UserRoutes");

app.get("/", (req, res) => {
  res.json({ message: "Agrometer Backend" });
});
app.use("/user", UserRoutes);

app
  .listen(port, () => {
    console.log(`Server is running on port ${port}`);
  })
  .on("error", (err) => {
    console.error("Error starting server:", err);
  });
