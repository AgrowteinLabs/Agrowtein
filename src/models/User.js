const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      country: {
        type: String,
      },
      postal_code: {
        type: String,
      },
    },
    dayOfRegistration: {
      type: Date,
      default: Date.now(),
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    termsAgreement: {
      type: Boolean,
    },
    privacyPolicyAgreement: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
