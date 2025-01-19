const express = require("express");
const formidable = require("express-formidable");
const {
  authMiddleware,
  adminAuthMiddleware,
} = require("../middlewares/auth.middlewares");
const {
  createProductController,
  fetchProductsController,
  fetchSingleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
} = require("../controllers/products.controllers");

const router = express.Router();

router.post(
  "/create-product",
  authMiddleware,
  adminAuthMiddleware,
  formidable(),
  createProductController
);

router.get("/fetch-products", fetchProductsController);

router.get("/fetch-products/:slug", fetchSingleProductController);

// get photo route
router.get("/product-photo/:id", productPhotoController);

router.put(
  "/update-product/:id",
  authMiddleware,
  adminAuthMiddleware,
  formidable(),
  updateProductController
);

router.delete(
  "/delete-product/:id",
  authMiddleware,
  adminAuthMiddleware,
  deleteProductController
);

module.exports = router;
