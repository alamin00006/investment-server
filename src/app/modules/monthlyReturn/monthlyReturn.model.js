const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const monthlyReturnSchema = new mongoose.Schema(
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

const MonthlyReturn = mongoose.model("MonthlyReturn", monthlyReturnSchema);
module.exports = MonthlyReturn;
