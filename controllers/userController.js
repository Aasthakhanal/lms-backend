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
                                                                                                                                                                                                                                     