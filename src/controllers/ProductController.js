const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().exec();
    if (!products) {
      res.status(404).json({ message: "No products found." });
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching products data." });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).exec();
    if (!product) {
      res.status(404).json({ message: "Product not found." });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching product data." });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      modelNumber: req.body.modelNumber,
    }).exec();
    if (!product) {
      const newProduct = new Product(req.body);
      await newProduct.save();
      res.status(201).json({ message: "Product created successfully." });
    } else {
      res.status(409).json({ message: "Product already exists." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error creating product." });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body
    );
    if (!product) {
      res.status(404).json({ message: "Product not found." });
    } else {
      res.status(200).json({ message: "Product updated successfully." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating product." });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);
    if (!product) {
      res.status(404).json({ message: "Product not found." });
    } else {
      res.status(200).json({ message: "Product deleted successfully." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting product." });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
