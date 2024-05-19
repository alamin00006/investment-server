const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const yearlyReturnSchema = new mongoose.Schema(
  {
    property: {
      type: ObjectId,
      ref: "Property",
      required: true,
    },
    returnDate: {
      type: Date,
      required: true,
    },
    returnAmount: {
      type: Number,
      required: true,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const YearlyReturn = mongoose.model("YearlyReturn", yearlyReturnSchema);
module.exports = YearlyReturn;
