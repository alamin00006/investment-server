import mongoose from "mongoose";

const AdminUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },

    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      //   required: true,
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

    address: {
      type: String,
    },
    role: {
      type: String,
      enum: ["superAdmin", "admin", "user", "manager", "PR Manager"],
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

export default mongoose.model("AdminUser", AdminUserSchema);
