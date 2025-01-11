const jwt = require("jsonwebtoken");
const Users = require("../models/users.models");

// Middleware for protecting the route
exports.authMiddleware = async (req, res, next) => {
  try {
    const verified = await jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = verified;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success:false,
      message: "Access Denied"
    })
  }
};

// Middleware  for admin routes
exports.adminAuthMiddleware = async (req, res, next) => {
  try {
    const user = await Users.findById(req.user._id);
    if (!user.role == 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message: "Internal Server Error"
  })
  }
};
