import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    propertyName: {
      type: String,
    },
    propertyAddress: {
      type: String,
    },
    userId: {
      type: String,
    },
    refferCode: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Other",
    },
    password: {
      type: String,
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      enum: ["superAdmin", "admin", "user", "manager", "vendor"],
      default: "user",
    },
    userStatus: {
      type: String,
      enum: ["Active", "Deactive", "Blocked"],
      default: "Active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
