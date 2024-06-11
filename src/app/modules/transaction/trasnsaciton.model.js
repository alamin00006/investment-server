import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const transacitonShema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
    },
    investId: {
      type: ObjectId,
      ref: "Invest",
    },
    bankName: {
      type: String,
      required: true,
    },
    accountHolderName: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    transferAmount: {
      type: Number,
      required: true,
    },
    transferMode: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Canceled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transacitonShema);
