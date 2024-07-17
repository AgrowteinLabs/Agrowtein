const express = require("express");
const router = express.Router();
const {
  usernewpassword,
  deleteuser,
} = require("../controllers/UserController");

router.post("/:userId/newpassword", usernewpassword);
router.delete("/:userId", deleteuser);

/*
Create user : POST , url:api/v1/users
Update user : PUT ,  url:api/v1/users/:userid
Delete user : DELETE ,  url:api/v1/users/:userid
Get user : GET ,  url:api/v1/users/:userid

*/
module.exports = router;
