const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    productName : {
      type: String,
    },
    price: {
      type: String,
    },
    hsn: {
      type: String,
    },
    gst: {
      type: String,
    },
    quantity: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
