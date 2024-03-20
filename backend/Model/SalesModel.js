const mongoose = require("mongoose");

const SalesSchema = new mongoose.Schema(
  {
    productId : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: String,
    },
    costPrice: {
      type: String,
    },
    sellingPrice: {
      type: String,
    },
    gst: {
      type: String,
    },
    profit: {
      type: String,
    },
    billId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profit",
    },
  },
  {
    timestamps: true,
  }
);

const Sales = mongoose.model("Sales", SalesSchema);

module.exports = Sales;
