const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const logger = (req, res) => {
  try {
    const logDir = path.join(__dirname,"..", "logs");
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    const logFilePath = path.join(logDir, "access.log");
    const accessLogStream = fs.createWriteStream(logFilePath, { flags: "a" });
    const logFormat = `Date: :date[iso]\t:method\t:req[header="origin"]\t:url\tStatus: :status\t:response-time ms`;
    return morgan(logFormat, { stream: accessLogStream });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { logger };
