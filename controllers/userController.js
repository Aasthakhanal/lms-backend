import { UserModel } from "../models/userModel.js";

export const registerUser = async (req, res) => {
  try {
    const reqBody = req.body;
    const ifUsersEmailAlreadyExists = await UserModel.find({
      email: reqBody.email,
    });
    if (ifUsersEmailAlreadyExists.length > 0) {
      return res.json({
        success: false,
        message: `User with email ${reqBody.email} already exists`,
      });
    }
    const newUser = await UserModel.create(reqBody);
    return res.json({
      success: true,
      data: newUser,
      message: `Dear ${newUser.name}, Welcome to Library Management System`,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
export const loginUser = async (req, res) => {
  try {
    const reqBody = req.body;

    const foundUser = await UserModel.findOne({
      email: reqBody.email,
    });
    if (!foundUser) {
      res.json({
        success: false,
        message: "invalid credentials!!",
      });
    }
    const isPasswordMatched = await foundUser.isPasswordValid(reqBody.password);
    if (isPasswordMatched) {
      const userData = {
        name: foundUser.name,
        email: foundUser.email,
        address: foundUser.address,
        phoneNumber: foundUser.phoneNumber,
      };
      return res.json({
        success: true,
        data: userData,
        message: `Welcome back ${foundUser.name}`,
      });
    }
    res.json({
      success: false,
      message: "Invalid credentials!!!",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
