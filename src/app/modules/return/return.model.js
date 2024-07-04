import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const returnSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
    },
    investId: {
      type: ObjectId,
      ref: "Investment",
    },
    manageUserId: {
      type: ObjectId,
      ref: "AdminUser",
    },
    investmentAmount: {
      type: Number,
    },
    percentageOfProfit: {
      type: Number,
    },
    profitCount: {
      type: Number,
    },
    payOfProfitAmount: {
      type: Number,
    },
    dueProfitAmount: {
      type: Number,
    },
    acceptableStatus: {
      type: String,
      enum: ["Accepted", "Pending", "Rejected", "Completed"],
      default: "Pending",
    },
    paymentDate: {
      type: Date,
    },
    paymentMethod: {
      type: String,
    },
    investmentReturnType: {
      type: String,
    },
    returnType: {
      type: String,
    },
    noteForReturn: {
      type: String,
    },
    proofReturnPhoto: {
      type: Array,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Return", returnSchema);
