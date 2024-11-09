const express = require("express");
const router = express.Router();
const {
  getUserProducts,
  getUserProductByUid,
  createUserProduct,
  updateUserProduct,
  deleteUserProduct,
} = require("../controllers/UserProductController");

/**
 * @swagger
 * components:
 *   schemas:
 *     UserProduct:
 *       type: object
 *       required:
 *         - userId
 *         - productId
 *         - uid
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the UserProduct
 *         userId:
 *           type: string
 *           description: The id of the user who owns this product
 *         productId:
 *           type: string
 *           description: The id of the product
 *         uid:
 *           type: string
 *           description: The unique identifier of the user product
 *         state:
 *           type: string
 *           enum: ["ON", "OFF", "ERROR"]
 *           description: The current state of the user product
 *         location:
 *           type: string
 *           description: The installation location of the user product
 *         installationDate:
 *           type: string
 *           format: date-time
 *           description: The date when the product was installed
 *         sensors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               sensorId:
 *                 type: string
 *                 description: The id of the sensor
 *               state:
 *                 type: string
 *                 enum: ["ON", "OFF", "ERROR"]
 *                 description: The current state of the sensor
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the UserProduct was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the UserProduct was last updated
 *       example:
 *         id: 60d0fe4f5311236168a109ca
 *         userId: 60d0fe4f5311236168a109c9
 *         productId: 60d0fe4f5311236168a109c8
 *         uid:
 *         state: ON
 *         location: "New York, NY"
 *         installationDate: 2023-10-01T00:00:00.000Z
 *         sensors:
 *           - sensorId: 60d0fe4f5311236168a109c7
 *             state: ON
 *         createdAt: 2023-10-01T00:00:00.000Z
 *         updatedAt: 2023-10-01T00:00:00.000Z
 */

router.get("/:userId/", getUserProducts);
router.get("/uid/:uid", getUserProductByUid);
router.post("/", createUserProduct);
router.put("/:uid", updateUserProduct);
router.delete("/:productId", deleteUserProduct);

module.exports = router;
