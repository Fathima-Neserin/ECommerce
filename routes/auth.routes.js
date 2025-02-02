const express = require("express");
const {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  fetchOrdersController,
  fetchAllOrdersController,
  orderStatusController,
  fetchAllUsers,
  deleteUsers,
} = require("../controllers/auth.controllers");
const {
  authMiddleware,
  adminAuthMiddleware,
} = require("../middlewares/auth.middlewares");

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

// Forgot-Password
router.post("/forgot-password", forgotPasswordController);

// protected user route
router.get("/user-auth", authMiddleware, (req, res) => {
  res.status(200).send({ ok: true });
});

// protected admin route
router.get("/admin-auth", authMiddleware, adminAuthMiddleware, (req, res) => {
  res.status(200).send({ ok: true });
});

router.put("/profile-update/", authMiddleware, updateProfileController);

// user orders
router.get("/orders", authMiddleware, fetchOrdersController);

// admin orders
router.get("/all-orders", authMiddleware, adminAuthMiddleware, fetchAllOrdersController);

// order status update
router.put("/order-status/:orderId", authMiddleware, adminAuthMiddleware, orderStatusController);

router.get("/users", authMiddleware, adminAuthMiddleware, fetchAllUsers);

router.delete("/delete-user/:id", authMiddleware, adminAuthMiddleware, deleteUsers);

// router.get("/test", authMiddleware, adminAuthMiddleware, testController)

module.exports = router;
