const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.Types.ObjectId,
        ref: "products",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Ordered",
      enum: [
        "Ordered", "Dispatched", "Shipped", "Out For Delivery", "Delivered",
        "Cancel Order",
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orders", orderSchema);
