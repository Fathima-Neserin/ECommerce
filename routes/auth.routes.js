const express = require("express");
const {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
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
// router.get("/test", authMiddleware, adminAuthMiddleware, testController)

module.exports = router;
