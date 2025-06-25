import jwt from "jsonwebtoken";
import { jwtSecretKey } from "../utils/generateToken.js";
import { UserModel } from "../models/userModel.js";

export const checkauthorization = async (req, res, next) => {
  try {
    const token = req?.body?.token;
    if (!token) {
      return res.json({
        success: false,
        message: "Looks like you have been logged out!",
      });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded._id) {
      return res.json({
        success: false,
        message: "you are Unauthorized!!",
      });
    }
    const user = await UserModel.findById(decoded._id);
    if (!user) {
      return res.json({
        success: false,
        message: "Invalid User or User not found!!",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
