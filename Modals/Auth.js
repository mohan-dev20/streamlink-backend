import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
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

    plan: {
      type: String,
      enum: ["FREE", "BRONZE", "SILVER", "GOLD"],
      default: "FREE",
    },

    profilePic: {
      type: String,
      default: "",
    },

    bannerImage: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    isPremium: {
      type: Boolean,
      default: false,
    },

    // NEW
    subscribers: {
      type: Number,
      default: () => Math.floor(Math.random() * 50000) + 1000,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;