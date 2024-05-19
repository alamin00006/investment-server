import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const createUser = async (req, res) => {
  try {
    const {
      name,
      address,
      email,
      phone,
      propertyAddress,
      propertyName,
      role,
      branch: branchId,
    } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with email already exists" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      name,
      address,
      email,
      phone,
      role,
      propertyName,
      propertyAddress,
      password: hashedPassword,
      branch: branchId,
    });

    await user.save();

    const token = jwt.sign(
      {
        name: user.name + " " + user.lastName,
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ user, token, message: "Registration successful" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email and populate the branch field
    const user = await User.findOne({ email });

    // If the user does not exist, return an error message
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    if (user.userStatus === "Blocked" || user.userStatus === "Deactive") {
      res
        .status(401)
        .json({ message: "User is blocked or deactivated and cannot log in" });
      return;
    }

    // Compare the provided password with the stored password
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If the passwords do not match, return an error message
    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    // Create a user object with limited properties, including the branch
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
    };

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, "your-secret-key");

    // Return the token and user information
    res.status(200).json({ token, user: userData });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    // Status Update

    if (req?.body?.userStatus) {
      await User.updateOne(
        { _id: id },
        {
          $set: {
            userStatus: req?.body?.userStatus,
          },
        },
        { runValidators: true }
      );
      res.status(200).json({
        status: "success",
        message: "Data updated Successfully",
      });
    } else {
      const userUpdate = {
        name: req.body?.name,
        email: req.body?.email,
        phone: req.body?.phone,
        userName: req.body?.userName,
        userId: req.body?.userId,
        dateOfBirth: req.body?.dateOfBirth,
        gender: req.body?.gender,
      };

      await User.updateOne(
        { _id: id },
        { $set: userUpdate },
        { runValidators: true }
      );
      res.status(200).json({
        status: "success",
        message: "Data updated Successfully",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "data not updated",
      error: error.message,
    });
  }
};
export const updatePassword = async (req, res) => {
  try {
    const {
      userId,
      currentPassword,
      newPassword,
      name,
      email,
      phone,
      address,
    } = req.body;

    // Find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Verify the role of the user
    if (user.role !== "admin") {
      res.status(401).json({ message: "Unauthorized access" });
      return;
    }

    // Update the user's password if a new password is provided
    if (currentPassword) {
      const passwordMatch = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!passwordMatch) {
        res.status(401).json({ message: "Current password is incorrect" });
        return;
      }

      if (newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
      }
    }

    // Update other user data if provided
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (phone) {
      user.phone = phone;
    }
    if (address) {
      user.address = address;
    }

    await user.save();

    res.status(200).json({ message: "User data updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("deleted successfully");
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getAdmin = async (req, res, next) => {
  try {
    const { email } = req.query;

    const adminUser = await User.findOne({ email, role: "admin" });

    if (!adminUser) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    res.status(200).json(adminUser);
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
export const getManager = async (req, res, next) => {
  try {
    const users = await User.find({ role: "manager" });
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const getJWT = async (req, res, next) => {
  try {
    const email = req.query.email;
    const query = { email: email };
    const user = await User.findOne(query);
    if (user) {
      const token = jwt.sign({ email }, process.env.ACCESS_TOKEN, {
        expiresIn: "1h",
      });
      return res.send({ accessToken: token });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

//update admin user
export const updateUserAdmin = async (req, res, next) => {
  try {
    const banner = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(banner);
  } catch (err) {
    next(err);
  }
};

//validate with jwt registration
