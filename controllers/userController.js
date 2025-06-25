import { UserModel, validateUserSchema } from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const reqBody = req.body;
    const validateUser =  validateUserSchema.validate(reqBody);
    if( validateUser.error ) {
      return res.json({
        success: false,
        message: validateUser.error.message,
      });
    }
    const ifUsersEmailAlreadyExists = await UserModel.find({
      email: reqBody.email,
    });
    if (ifUsersEmailAlreadyExists.length > 0) {
      return res.json({
        success: false,
        message: `User with email ${reqBody.email} already exists`,
      });
    }
    const newUserInfo = {
      name: reqBody.name,
      email: reqBody.email,
      password: reqBody.password,
      address: reqBody.address,
      phoneNumber: reqBody.phoneNumber,
    };
    const newUser = await UserModel.create(validateUser.value);
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
      const token = await generateToken({ _id: foundUser?._id });
      if (!token) {
        return res.json({
          success: false,
          message: "Something Went Wrong!!!",
        });
      }

      const userData = {
        _id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
        address: foundUser.address,
        phoneNumber: foundUser.phoneNumber,
        token: token,
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
export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const reqBody = req.body;

    const foundUser = await UserModel.findById(userId);

    if (!foundUser) {
      return res.json({
        success: false,
        message: "User not found!!!",
      });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(userId, reqBody, {
      new: true,
    });

    return res.json({
      success: true,
      data: updatedUser,
      message: "User Updated Successfully!!",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const foundUser = await UserModel.findById(userId);

    if (!foundUser) {
      return res.json({
        success: false,
        message: "User not found!!!",
      });
    }

    await UserModel.findByIdAndDelete(userId);

    return res.json({
      success: true,
      message: `${foundUser.name} deteted Successfully`,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
                                                                                                                                                                                                                                     