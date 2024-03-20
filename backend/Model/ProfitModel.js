const mongoose = require("mongoose");

const ProfitSchema = new mongoose.Schema(
  {
    totalProfit: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Profit = mongoose.model("Profit", ProfitSchema);

module.exports = Profit;
