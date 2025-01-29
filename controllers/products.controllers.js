const Products = require("../models/products.models");
const fs = require("fs");
const slugify = require("slugify");

exports.createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    // Validation
    switch (true) {
      case !name:
        return res.status(401).send({ error: "Name is required" });
      case !name:
        return res.status(401).send({ error: "Name is required" });
      case !description:
        return res.status(401).send({ error: "Description is required" });
      case !price:
        return res.status(401).send({ error: "Price is required" });
      case !category:
        return res.status(401).send({ error: "Category is required" });
      case !quantity:
        return res.status(401).send({ error: "Quantity is required" });
      case photo && photo.size > 1000000:
        return res
          .status(401)
          .send({ error: "Photo is required and should be less than 1 MB" });
    }

    const newProduct = await Products.create({
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      newProduct.photo.data = fs.readFileSync(photo.path);
      newProduct.photo.contentType = photo.type;
    }
    await newProduct.save();
    res.status(201).send({
      success: true,
      message: "New product created successfully",
      newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating products",
    });
  }
};

exports.fetchProductsController = async (req, res) => {
  try {
    const products = await Products.find()
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All products fetched",
      total: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching all products",
      error,
    });
  }
};

exports.fetchSingleProductController = async (req, res) => {
  try {
    const product = await Products.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single product fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching single product",
      error,
    });
  }
};

exports.productPhotoController = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching product photo",
      error,
    });
  }
};

exports.deleteProductController = async (req, res) => {
  try {
    await Products.findByIdAndDelete(req.params.id).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

exports.updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    // Validation
    switch (true) {
      case !name:
        return res.status(401).send({ error: "Name is required" });
      case !name:
        return res.status(401).send({ error: "Name is required" });
      case !description:
        return res.status(401).send({ error: "Description is required" });
      case !price:
        return res.status(401).send({ error: "Price is required" });
      case !category:
        return res.status(401).send({ error: "Category is required" });
      case !quantity:
        return res.status(401).send({ error: "Quantity is required" });
      case photo && photo.size > 1000000:
        return res
          .status(401)
          .send({ error: "Photo is required and should be less than 1 MB" });
    }

    const updateProduct = await Products.findByIdAndUpdate(
      req.params.id,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      updateProduct.photo.data = fs.readFileSync(photo.path);
      updateProduct.photo.contentType = photo.type;
    }
    await updateProduct.save();
    res.status(201).send({
      success: true,
      message: "Product updated successfully",
      updateProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating product",
      error,
    });
  }
};
exports.filterProductController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let query = {};
    if (checked.length > 0) query.category = checked;
    if (radio.length) query.price = { $gte: radio[0], $lte: radio[1] };
    const products = await Products.find(query);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while filtering products",
      error,
    });
  }
};
exports.countProductController = async (req, res) => {
  try {
    const totalProducts = await Products.find().estimatedDocumentCount();
    res.status(200).send({
      success: true,
      totalProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while counting products",
      error,
    });
  }
};
// Product list based on page - Pagination
exports.listProductController = async (req, res) => {
  try {
    const pages = 4;
    const page = req.params.page ? req.params.page : 1;
    const products = await Products.find()
      .select("-photo")
      .skip((page - 1) * pages)
      .limit(pages)
      .sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        products
      })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while listing products per page",
      error,
    });
  }
};
