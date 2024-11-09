//const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
  origin: true /*(origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      console.error(`CORS error: ${origin} not allowed by CORS`);
      callback(new Error("Not allowed by CORS"));
    }
  }*/,
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  methods: ["GET", "POST", "PUT", "DELETE"],
};

module.exports = corsOptions;
