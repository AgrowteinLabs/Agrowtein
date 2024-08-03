const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  getProductBySerial,
  getProductsByUser,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/ProductController");

router.get("/", getProducts);
router.get("/:productId", getProductById);
router.get("/serial/:serialNumber", getProductBySerial);
router.get("/user/:userId", getProductsByUser);
router.post("/", createProduct);
router.put("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);

module.exports = router;
