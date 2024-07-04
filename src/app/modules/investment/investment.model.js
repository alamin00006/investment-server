import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const investmentSchema = new mongoose.Schema(
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
    totalReceiveAmount: {
      type: Number,
    },
    dueAmount: {
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
    proofOfInvestPhoto: {
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
    profitAmountMin: {
      type: Number,
    },
    profitAmountMax: {
      type: Number,
    },
    percentOfReturnMin: {
      type: Number,
    },
    percentOfReturnMax: {
      type: Number,
    },
    totalProfitAmount: {
      type: Number,
    },
    totalPaidProfitAmount: {
      type: Number,
    },
    totalDueProfitAmount: {
      type: Number,
    },
    totalProfitOfPercentage: {
      type: Number,
    },
    investmentStartDate: {
      type: Date,
    },
    investmentEndDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Approved", "Canceled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);
const Invest = mongoose.model("Investment", investmentSchema);
export default Invest;
