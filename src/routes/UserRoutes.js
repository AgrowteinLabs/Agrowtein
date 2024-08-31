const express = require("express");
const router = express.Router();
const {
  userNewPassword,
  deleteUser,
  getUsers,
  getUserById,
  createUser,
  updateUser,
} = require("../controllers/UserController");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - password
 *         - phoneNumber
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         fullName:
 *           type: string
 *           description: The full name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         phoneNumber:
 *           type: string
 *           description: The phone number of the user
 *         address:
 *           type: object
 *           properties:
 *             city:
 *               type: string
 *               description: The city of the user's address
 *             state:
 *               type: string
 *               description: The state of the user's address
 *             country:
 *               type: string
 *               description: The country of the user's address
 *             postalCode:
 *               type: string
 *               description: The postal code of the user's address
 *         dayOfRegistration:
 *           type: string
 *           format: date
 *           description: The date the user registered
 *         role:
 *           type: string
 *           enum: ["user", "admin"]
 *           description: The role of the user
 *         termsAgreement:
 *           type: boolean
 *           description: Whether the user agreed to the terms
 *         privacyPolicyAgreement:
 *           type: boolean
 *           description: Whether the user agreed to the privacy policy
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the user was last updated
 *       example:
 *         id: 60d0fe4f5311236168a109ca
 *         fullName: John Doe
 *         email: johndoe@example.com
 *         password: password123
 *         phoneNumber: "+1234567890"
 *         address:
 *           city: New York
 *           state: NY
 *           country: USA
 *           postalCode: 10001
 *         dayOfRegistration: 2023-10-01
 *         role: user
 *         termsAgreement: true
 *         privacyPolicyAgreement: true
 *         createdAt: 2023-10-01T00:00:00.000Z
 *         updatedAt: 2023-10-01T00:00:00.000Z
 */

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.post("/", createUser);
router.post("/:userId/newpassword", userNewPassword);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

module.exports = router;
