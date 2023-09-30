const cloudinary = require("../config/cloudinary.js");
const Product = require("../models/productmodel");

exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, price, rating, category, stock } = req.body;

    // Check fields 
    if (!name || !price || !description || !category) {
      return res.status(400).json({ message: "product require fields." });
    }
    if (!req.body.image)
      return res.status(400).json({ message: "Choose image" });

    const uploadRes = await cloudinary.uploader.upload(req.body.image, {
      upload_preset: "alphaShop",
    });

    const { public_id, secure_url } = uploadRes;
    req.body.image = { public_id, secure_url };
    const product = await Product.create(req.body);
    res.json({ message: "Product created with success" });
  } catch (error) {}
};

// get all product

exports.getProduct = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {}
};

// get a product
exports.getOneProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.json({ product });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// update a product

exports.updateOneProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product doesn't exist" });
    }

    res.json({
      product: updatedProduct,
      message: "Product updated with success",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete a product

exports.deleteOneProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    //delete product by ID
    const deletedProduct = await Product.findByIdAndRemove(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product doesn't exist" });
    }

    res.json({ message: "Product deleted with success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
