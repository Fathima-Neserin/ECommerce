const express = require("express");
const {
  authMiddleware,
  adminAuthMiddleware,
} = require("../middlewares/auth.middlewares");
const {
  createCategoryController,
  updateCategoryController,
  categoriesController,
  singleCategoryController,
  deleteCategoryController,
} = require("../controllers/categories.controllers");

const router = express.Router();

router.get("/categories", categoriesController);

router.get("/single-category/:slug", singleCategoryController);

router.post(
  "/create-category",
  authMiddleware,
  adminAuthMiddleware,
  createCategoryController
);

router.put(
  "/update-category/:id",
  authMiddleware,
  adminAuthMiddleware,
  updateCategoryController
);

router.delete(
  "/delete-category/:id",
  authMiddleware,
  adminAuthMiddleware,
  deleteCategoryController
);

module.exports = router;
