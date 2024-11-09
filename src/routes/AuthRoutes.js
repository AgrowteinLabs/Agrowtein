const express = require("express");
const { Login, Refresh, Logout } = require("../controllers/AuthController");
const router = express.Router();

router.post("/login", Login);
router.post("/refresh", Refresh);
router.post("/logout", Logout);

module.exports = router;
