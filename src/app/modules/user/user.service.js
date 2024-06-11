import User from "./user.model.js";
const createUser = async (user) => {
  try {
    const email = user.email;
    const findUser = await User.findOne({ email });

    if (findUser) {
      return {
        status: "fail",
        message: "Sorry! Already Account Created with this Email",
      };
    }

    const userData = {
      name: user.name,
      email: user.email,
      password: user.password,
    };

    const newUser = new User(userData);
    const result = await newUser.save();

    return {
      status: "success",
      message: "User created successfully!",
      data: result,
    };
  } catch (error) {
    return {
      status: "error",
      message: "An error occurred while creating the user.",
      error: error.message,
    };
  }
};

const createLogin = async (user) => {
  try {
  } catch (error) {}
};

export const userService = {
  createUser,
};
