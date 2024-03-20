const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(+new Date() + 5 * 60 * 1000),
    }, // OTP expires in 5 minutes
  },
  {
    timestamps: true,
  }
);

const OTP = mongoose.model("OTP", otpSchema);

module.exports = OTP;
