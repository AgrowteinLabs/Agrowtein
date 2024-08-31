const express = require("express");const router = express.Router();
const {
  getProducts,
  getProductById,
  getProductBySerial,
  getProductsByUser,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/ProductController");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The products managing API
 * /api/v1/products:
 *   get:
 *     summary: Retrieve a list of products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Some server error
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: The created product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       409:
 *         description: Product already exists
 *       500:
 *         description: Some server error
 * /api/v1/products/{productId}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: The product description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Some server error
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The updated product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Some server error
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: The product was deleted
 *       404:
 *         description: Product not found
 *       500:
 *         description: Some server error
 * /api/v1/products/serial/{serialNumber}:
 *   get:
 *     summary: Get a product by serial number
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: serialNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: The product serial number
 *     responses:
 *       200:
 *         description: The product description by serial number
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Some server error
 * /api/v1/products/user/{userId}:
 *   get:
 *     summary: Get products by user ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The products by user ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: No products found
 *       500:
 *         description: Some server error
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - userId
 *         - serialNumber
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the product
 *         name:
 *           type: string
 *           description: The name of the product
 *         description:
 *           type: string
 *           description: The description of the product
 *         userId:
 *           type: string
 *           description: The ID of the user who owns the product
 *         state:
 *           type: string
 *           enum: ["ON", "OFF", "ERROR"]
 *           description: The state of the product
 *         location:
 *           type: string
 *           description: The location of the product
 *         productType:
 *           type: string
 *           description: The type of the product
 *         modelNumber:
 *           type: string
 *           description: The model number of the product
 *         serialNumber:
 *           type: string
 *           description: The serial number of the product
 *         sensor:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: The ID of the sensor
 *               state:
 *                 type: string
 *                 enum: ["ON", "OFF", "ERROR"]
 *                 description: The state of the sensor
 *         usageMetrics:
 *           type: string
 *           description: The usage metrics of the product
 *         installationDate:
 *           type: string
 *           format: date
 *           description: The installation date of the product
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the product was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the product was last updated
 *       example:
 *         id: 60d0fe4f5311236168a109ca
 *         name: Smart Sensor
 *         description: A sensor that monitors temperature and humidity
 *         userId: 60d0fe4f5311236168a109cb
 *         state: ON
 *         location: Warehouse
 *         productType: Sensor
 *         modelNumber: SS-100
 *         serialNumber: SN-123456
 *         sensor:
 *           - _id: 60d0fe4f5311236168a109cc
 *             state: ON
 *         usageMetrics: "Active for 1000 hours"
 *         installationDate: 2023-10-01
 *         createdAt: 2023-10-01T00:00:00.000Z
 *         updatedAt: 2023-10-01T00:00:00.000Z
 */

router.get("/", getProducts);
router.get("/:productId", getProductById);
router.get("/serial/:serialNumber", getProductBySerial);
router.get("/user/:userId", getProductsByUser);
router.post("/", createProduct);
router.put("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);

module.exports = router;
