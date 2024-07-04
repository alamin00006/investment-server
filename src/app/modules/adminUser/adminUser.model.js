import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

// Schema Design
const adminUserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      //   required: true,
    },

    // projectTitleId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "ProjectTitle",
    // },

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
      required: true,
    },

    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["superAdmin", "admin", "manager", "prManager"],
      default: "admin",
      required: true,
    },
    userStatus: {
      type: String,
      enum: ["Active", "Deactive", "Blocked"],
      default: "Active",
    },
  },
  { timestamps: true }
);

// Middleware to hash password before saving
adminUserSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(9);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

// Method to compare passwords
adminUserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Model
const AdminUser = mongoose.model("AdminUser", adminUserSchema);

export default AdminUser;
