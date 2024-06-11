import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const investShema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
    },

    projectInfo: {
      type: Object,
    },
    projectId: {
      type: ObjectId,
      ref: "Project",
    },
    investAmount: {
      type: Number,
    },
    totalInvestAmount: {
      type: Number,
    },
    paymentFee: {
      type: Number,
    },
    returnType: {
      type: String,
    },
    durationOfInvest: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    notaryFee: {
      type: Number,
    },
    sharikanaFee: {
      type: Number,
    },
    InvestorPhoto: {
      type: Array,
    },
    investorNid: {
      type: Array,
    },
    nomineePhoto: {
      type: Array,
    },
    nomineeNid: {
      type: Array,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Canceled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);
const Invest = mongoose.model("Invest", investShema);
export default Invest;
