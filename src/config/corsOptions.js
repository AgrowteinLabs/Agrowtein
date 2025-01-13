const corsOptions = {
  origin: true,  // Allow all origins
  optionsSuccessStatus: 200,  // Success status for preflight responses
  credentials: true,  // Allow credentials (cookies, authorization headers)
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],  // Allowed headers
  methods: ["GET", "POST", "PUT", "DELETE"],  // Allowed HTTP methods
};

module.exports = corsOptions;
