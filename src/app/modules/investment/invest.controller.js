import Invest from "./invest.model.js";

export const createInvest = async (req, res) => {
  try {
    const { ...investData } = req.body;
    const invest = new Invest(investData);
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
    const invest = await Invest.findOne({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      message: "data get Success",
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

export const getAllInvest = async (req, res) => {
  try {
    const invest = await Invest.find({}).sort({ createdAt: -1 });
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

export const updateInvest = async (req, res) => {
  try {
    const ivestId = req.params.id;

    const invest = await Invest.updateOne(
      {
        _id: ivestId,
      },
      {
        $set: {
          proofInvestPhoto: req?.body,
        },
      }
    );

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
