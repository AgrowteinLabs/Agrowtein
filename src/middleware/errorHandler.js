const fs = require("fs");
const path = require("path");

const errorHandler = (err, req, res, next) => {
  try {
    const logFilePath = path.join(__dirname, "..", "logs", "error.log");
    const errorLogStream = fs.createWriteStream(logFilePath, { flags: "a" });
    const errorMessage = `Date: ${new Date().toISOString()}\t${req.method}\t${req.headers.origin}\t${req.url}\tError: ${err.message}\n`;
    errorLogStream.write(errorMessage);
    res.status(500).send("Internal Server Error");
  } catch (err) {
    console.error(err);
  }
};

module.exports = { errorHandler };