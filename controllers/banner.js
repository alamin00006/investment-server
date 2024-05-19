import Banner from "../models/Banner.js";
export const CreateBanner = async (req, res, next) => {
  const newBanner = new Banner(req.body);
  try {
    const banner = await newBanner.save();
    res.status(200).json(banner);
  } catch (err) {
    next(err);
  }
};
export const getBanner = async (req, res, next) => {
  try {
    const banners = await Banner.find({});
    res.status(200).json({
      status: "success",
      message: "Banners Get successfully",
      data: banners,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to get banners",
      error: error.message,
    });
  }
};
export const getSingleBanner = async (req, res, next) => {
  try {
    const banner = await Banner.findById(req.params.id);
    res.status(200).json(banner);
  } catch (err) {
    next(err);
  }
};
export const deleteBanner = async (req, res, next) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    res.status(200).json(banner);
  } catch (err) {
    next(err);
  }
};

export const updateBanner = async (req, res, next) => {
  try {
    const banner = await Banner.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(banner);
  } catch (err) {
    next(err);
  }
};
