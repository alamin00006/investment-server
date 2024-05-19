import Category from "../models/Category.js";
export const createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    const result = await category.save();

    res.status(200).json({
      status: "success",
      message: "Succefully Added",
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

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({
      status: "success",
      message: "data get Success",
      data: categories,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Not Found Data",
      error: error.message,
    });
  }
};
