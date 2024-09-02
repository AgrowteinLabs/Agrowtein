const jwt = require("jsonwebtoken");

const verifyJWT = async (req, res, next) => {
  try {
    /*const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      console.log("User request invalid");
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];*/
    const token = req.cookies.accessToken;
    if (!token) {
      console.log("User request invalid, no token");
      return res.status(401).json({ message: "Unauthorized" });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.log("User request Forbidden");
        return res.status(403).json({ message: "Forbidden" });
      }
      req.user = decoded.userId;
      req.role = decoded.role;
      next();
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { verifyJWT };
