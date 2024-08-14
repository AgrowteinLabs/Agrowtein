const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Agrowtein API",
      version: "1.0.0",
      description: "Agrowtein Express API.",
      license: {
        name: "ISC",
        url: "https://opensource.org/licenses/ISC",
      },
      contact: {
        name: "Agrowtein Labs",
        url: "https://agrowtein.com/index.html",
        email: "info@agrowtein.com",
      },
    },
    servers: [
      {
        url: "http://localhost:4500",
        description: "Local server",
      },
      {
        url: "https://agrowteinlabs.onrender.com",
        description: "Development server",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

module.exports = options;
