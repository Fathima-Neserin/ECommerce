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
  filterProductController,
  countProductController,
  listProductController,
  searchProductController,
  similarProductController,
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

// filter product
router.post("/filter-products", filterProductController);

// count product
router.get("/count-product", countProductController);

// list products per page
router.get("/list-product/:page", listProductController);

// search product
router.get("/search/:keyword", searchProductController);

// similar-products
router.get("/related-product/:pdtId/:ctgId", similarProductController);

module.exports = router;
