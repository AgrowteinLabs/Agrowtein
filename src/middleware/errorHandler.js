const fs = require("fs");
const path = require("path");

const errorHandler = (err, req, res, next) => {
  try {
    const logFilePath = path.join(__dirname, "..", "logs", "error.log");
    const errorLogStream = fs.createWriteStream(logFilePath, { flags: "a" });
    errorMessage = `Date: ${new Date().toISOString()}\t${req.method}\t${
      req.headers.origin
    }\t${req.url}\tError: ${err.message}\n`;
    errorLogStream.write(errorMessage);
    console.log(errorMessage)
    res.status(500).send("Internal Server Error");
  } catch (err) {
    console.error(err);
  }
};

const logError = (err) => {
  const errorMessage = `Date: ${new Date().toISOString()}\tError: ${
    err.message
  }\n`;
  const logFilePath = path.join(__dirname, "..", "logs", "error.log");
  fs.appendFile(logFilePath, errorMessage, (error) => {
    if (error) console.error("Failed to write to log file:", error);
  });
};

module.exports = { errorHandler , logError };
