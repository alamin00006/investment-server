import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const hafleYearlyReturnSchema = new mongoose.Schema(
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

const HalfYearlyReturn = mongoose.model(
  "HalfYearlyReturn",
  hafleYearlyReturnSchema
);
module.exports = HalfYearlyReturn;
