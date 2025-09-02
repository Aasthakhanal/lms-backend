import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel.js";

export const generateToken = async (user) => {
  try {
    const token = jwt.sign(user, process.env.JWT_SECRET_KEY);

    return token;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const decodeJWT = async (token) => {
  try {
    const decoded = await jwt.verify(token, jwtsecretKey);

    if (!decoded && !decoded._id) {
      console.log("Invalid Token Detected!!!");
      return null;
    }

    const userId = decoded._id;

    const foundUser = await UserModel.findById(userId);

    return foundUser;
  } catch (error) {
    console.log(error);
  }
};
