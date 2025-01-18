const Categories = require("../models/categories.models");
const slugify = require("slugify");

exports.createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingCategory = await Categories.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category Already Exists",
      });
    }
    const newCategory = await Categories.create({ name, slug: slugify(name) });
    newCategory.save();
    res.status(201).send({
      success: true,
      message: "New Category created",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in category creation",
      error,
    });
  }
};

exports.updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await Categories.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    req.status(500).send({
      success: false,
      message: "Error while updating category",
      error,
    });
  }
};

exports.categoriesController = async (req, res) => {
  try {
    const categories = await Categories.find();
    res.status(200).send({
      success: true,
      message: "All Categories fetched",
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching all categories",
      error,
    });
  }
};

exports.singleCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await Categories.findOne({ slug });
    res.status(200).send({
      success: true,
      message: "Single category fetched successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching single category",
      error,
    });
  }
};

exports.deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await Categories.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting category",
      error,
    });
  }
};
