import Return from "./return.model.js";
import Investment from "../investment/investment.model.js";

export const getAllReturn = async (req, res) => {
  try {
    const transaction = await Return.find({})
      .populate("manageUserId investId")
      .sort({ createdAt: -1 });
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

export const updateReturn = async (req, res) => {
  try {
    const returnId = req.params.id;
    const returnData = await Return.findById(returnId);

    if (!returnData) {
      return res.status(404).json({
        status: "failed",
        message: "Return data not found",
      });
    }

    const query = {
      investId: returnData?.investId,
      acceptableStatus: "Payment Done",
    };

    if (req.body?.acceptableStatus === "Payment Done") {
      const { payOfProfitAmount, profitCount, percentageOfProfit } = req.body;

      const returns = await Return.find(query);
      let totalProfitAmount = 0;
      let totalGiveProfitAmount = 0;
      let totalProfitOfPercentage = 0;

      for (const item of returns) {
        totalGiveProfitAmount += item?.payOfProfitAmount || 0;
        totalProfitAmount += item?.profitCount || 0;
        totalProfitOfPercentage += item?.percentageOfProfit || 0;
      }

      // Update User Investment
      await Investment.findByIdAndUpdate(
        returnData.investId,
        {
          $set: {
            totalDueProfitAmount:
              totalProfitAmount +
              profitCount -
              (totalGiveProfitAmount + payOfProfitAmount),
            totalProfitAmount: totalProfitAmount + profitCount,
            totalPaidProfitAmount: totalGiveProfitAmount + payOfProfitAmount,
            totalProfitOfPercentage:
              totalProfitOfPercentage + percentageOfProfit,
          },
        },
        { new: true }
      );

      await Return.updateOne({ _id: returnId }, { $set: req.body });
    } else {
      await Return.updateOne({ _id: returnId }, { $set: req.body });
    }

    res.status(200).json({
      status: "success",
      message: "Data updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Error updating data",
      error: error.message,
    });
  }
};
