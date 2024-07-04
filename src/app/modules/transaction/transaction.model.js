import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
    },
    investId: {
      type: ObjectId,
      ref: "Investment",
    },
    paymentDate: {
      type: Date,
    },
    paymentMethod: {
      type: String,
    },
    bankName: {
      type: String,
      // required: true,
    },
    accountHolderName: {
      type: String,
      // required: true,
    },
    accountNumber: {
      type: String,
      // required: true,
    },
    receiveAmount: {
      type: Number,
      // required: true,
    },
    transferMode: {
      type: String,
    },
    noteForPayment: {
      type: String,
    },
    receiverName: {
      type: String,
    },
    investmentStartDate: {
      type: Date,
    },
    investmentEndDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Canceled"],
      default: "Pending",
    },
    acceptableStatus: {
      type: String,
      enum: ["Accepted", "Pending", "Rejected"],
      default: "Accepted",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
