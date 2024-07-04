import Investment from "./investment.model.js";
import Transaction from "../transaction/transaction.model.js";
import Return from "../return/return.model.js";

export const createInvest = async (req, res) => {
  try {
    const { ...investData } = req.body;
    const invest = new Investment(investData);
    const result = await invest.save();

    res.status(200).json({
      status: "success",
      message: "Thanks Your Invest",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Sorry ! Some wrong",
      error: error.message,
    });
  }
};

export const getUserLastInvest = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId);
    const userLastInvestment = await Investment.findOne({ userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      status: "success",
      message: "data get Success",
      data: userLastInvestment,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Not Found Data",
      error: error.message,
    });
  }
};

export const getAllInvest = async (req, res) => {
  try {
    const investments = await Investment.find({})
      .populate("userId")
      .sort({ createdAt: -1 });
    res.status(200).json({
      status: "success",
      message: "data get Success",
      data: investments,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Not Found Data",
      error: error.message,
    });
  }
};
export const getUserAllInvest = async (req, res) => {
  try {
    const userId = req.params.userId;
    const investments = await Investment.find({ userId })
      .populate("userId projectId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      message: "data get Success",
      investments,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Not Found Data",
      error: error.message,
    });
  }
};

export const updateInvest = async (req, res) => {
  try {
    const investId = req.params.id;

    //Status Update
    const invest = await Investment.updateOne(
      {
        _id: investId,
      },
      {
        $set: req.body,
      }
    );

    if (req.body?.receiveAmount) {
      const query = {
        investId: investId,
        acceptableStatus: "Accepted",
      };
      const transactions = await Transaction.find(query);
      let totalReceiveTk = 0;
      for (const item of transactions) {
        totalReceiveTk += item?.receiveAmount;
      }
      // Update User Investment

      await Investment.findByIdAndUpdate(
        investId,

        {
          $set: {
            dueAmount:
              req.body?.totalInvestAmount -
              (totalReceiveTk + req.body?.receiveAmount),
            totalReceiveAmount: totalReceiveTk + req.body?.receiveAmount,
            investmentStartDate: req.body?.investmentStartDate,
            investmentEndDate: req.body?.investmentEndDate,
          },
        },
        { new: true }
      );

      //  Create Transaction Every Payment Time
      const { ...transactionData } = req.body;
      const transaction = new Transaction(transactionData);

      await transaction.save();
    } else if (req.body?.percentageOfProfit) {
      const query = {
        investId: investId,
        acceptableStatus: "Accepted",
      };
      // const returns = await Return.find(query);
      // let totalProfitAmount = 0;
      // for (const item of returns) {
      //   totalProfitAmount += item?.payOfProfitAmount;
      // }
      // // Update User Investment

      // await Investment.findByIdAndUpdate(
      //   investId,

      //   {
      //     $set: {
      //       totalDueProfitAmount:
      //         req.body?.totalProfitAmount -
      //         (totalProfitAmount + req.body?.receiveAmount),
      //       totalReceiveAmount: totalProfitAmount + req.body?.receiveAmount,

      //     },
      //   },
      //   { new: true }
      // );
      //  Create Transaction Every Payment Time
      const { ...returnData } = req.body;
      const returnsData = new Return(returnData);
      await returnsData.save();
    }
    res.status(200).json({
      status: "success",
      message: "data update Success",
      data: invest,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Not Found Data",
      error: error.message,
    });
  }
};
