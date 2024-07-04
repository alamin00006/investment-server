import Investment from "../investment/investment.model.js";
import Transaction from "../transaction/transaction.model.js";

export const getAllTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.find({}).populate("investId userId").sort({ createdAt: -1 });
    res.status(200).json({
      status: "success",
      message: "data update Success",
      data: transaction,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Not Found Data",
      error: error.message,
    });
  }
};

export const getUserTransactions = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const transaction = await Transaction.find({ userId })
      .populate("investId")
      .sort({
        createdAt: -1,
      });

    // if totalAmount equal totalReceiveTk

    res.status(200).json({
      status: "Success",
      message: "Success",
      transaction,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Sorry Transaction not found",
      error: error.message,
    });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;

    const transaction = await Transaction.updateOne(
      {
        _id: transactionId,
      },
      {
        $set: req.body,
      }
    );

    res.status(200).json({
      status: "success",
      message: "data update Success",
      data: transaction,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Not Found Data",
      error: error.message,
    });
  }
};
