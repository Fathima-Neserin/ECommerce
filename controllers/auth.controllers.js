const { hashPassword, comparePassword } = require("../helpers/auth.helpers");
const Users = require("../models/users.models");
const Orders = require("../models/orders.models");
const jwt = require("jsonwebtoken");

exports.registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    // validation
    if (!name || !email || !password || !phone || !address || !answer) {
      return res.send({ message: "All Fields are Required " });
    }
    // user already exists
    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already registered, Please login",
      });
    }
    // register user
    const hashedPassword = await hashPassword(password);

    // save
    const newUser = await Users.create({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    });
    await newUser.save();
    res.status(201).send({
      success: true,
      message: "Registration done",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const matched = await comparePassword(password, user.password);
    if (!matched) {
      return res.status(404).send({
        success: true,
        message: "Incorrect Password",
      });
    }
    // token
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });

    res.status(200).send({
      success: true,
      message: "Login success",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};
exports.forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email || !answer || !newPassword) {
      return res.status(400).send("All foelds are required");
    }
    const user = await Users.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await Users.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
exports.updateProfileController = async (req, res) => {
  try {
    const { name, email, phone, password, address } = req.body;
    const user = await Users.findById(req.user._id);
    if (password && password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password is required and must have minimum 6 charecters long",
      });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await Users.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user?.name,
        email: email || user?.email,
        password: hashedPassword || user?.password,
        phone: phone || user?.phone,
        address: address || user?.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating profile",
      error,
    });
  }
};
exports.fetchOrdersController = async (req, res) => {
  try {
    const orders = await Orders.find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.status(200).send(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching your orders",
      error,
    });
  }
};
exports.fetchAllOrdersController = async (req, res) => {
  try {
    const orders = await Orders.find()
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: 1 });
    res.status(200).send(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching all orders",
      error,
    });
  }
};
exports.orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const updatedOrder = await Orders.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.status(200).send(updatedOrder);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating order status",
      error,
    });
  }
};
exports.fetchAllUsers = async (req, res) => {
  try {
    const adminId = req.user._id;
    const filteredUsers = await Users.find({ _id: { $ne: adminId } }).select(
      "-password"
    );
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in fetching all users", error.message);
    res.status(500).send({ error: "Internal server error" });
  }
};
exports.deleteUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await Users.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while deleting user",
      error,
    });
  }
};
// exports.testController = async(req, res) => {
//     try {
//         res.status(200).send({message:"Succesful Protected Route"})
//     } catch (error) {

//     }
// }
