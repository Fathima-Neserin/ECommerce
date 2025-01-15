const express = require("express");
const { registerController, 
    loginController, 
    testController} = require("../controllers/auth.controllers");
const { authMiddleware,
     adminAuthMiddleware } = require("../middlewares/auth.middlewares")
const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/user-auth", authMiddleware, (req, res) => {
    res.status(200).send({ ok: true });
})
// router.get("/test", authMiddleware, adminAuthMiddleware, testController)

module.exports = router;