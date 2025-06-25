import { UserModel, validateUserSchema } from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";


export const registerUser = async (req, res) => {
  try {
    const reqBody = req.body;

    const validatedUser = validateUserSchema.validate(reqBody);
    
    if (validatedUser.error) {
      return res.json({
        success: false,
        message: validatedUser.error.message,
      });
    }

    const foundUser = await UserModel.find({ email: reqBody.email });

    if (foundUser.length > 0) {
      return res.json({
        success: false,
        message: `User with email: ${reqBody.email} already exists`,
      });
    }
  
    // const newUserInfo = {
      //   email: reqBody.email,
    //   phoneNumber: reqBody.phoneNumber,
    //   password: reqBody.password,
    //   address: reqBody.address,
    //   name: reqBody.name,
    // };

    const newUser = await UserModel.create(validatedUser.value);

    return res.json({
      success: true,
      data: newUser,
      message: `Dear ${newUser.name}, Welcome to library management system.`,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const reqBody = req.body;

    const foundUser = await UserModel.findOne({ email: reqBody.email });

    console.log(foundUser);

    if (!foundUser) {
      return res.json({
        success: false,
        message: "Invalid Credentials!!!",
      });
    }

    const isPasswordMatched = await foundUser.isPasswordValid(reqBody.password);

    if (isPasswordMatched) {
      const token = await generateToken({ _id: foundUser?._id });

      if (!token) {
        return res.json({
          success: false,
          message: "Something went wrong!!",
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
      message: "Invalid Credentials!!!",
    });
  } catch (error) {
    console.log(error);
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
    if (
      foundUser._id.toString() !== req.user._id.toString() && !["Admin", "Staff"].includes(req.user.role) 
    ) {
      return res.json({
        success: false,
        message: "You are not authorized to update this user!!!",
      });
    }

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
export const updatePassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { newPassword, oldPassword } = req.body;
    const foundUser = await UserModel.findById(userId);

    if (!foundUser) {
      return res.json({
        success: false,
        message: "User not found!!!",
      });
    }
    const passwordMatched = await foundUser.isPasswordValid(oldPassword);
    if (!passwordMatched) {
      return res.json({
        success: false,
        message: "Old Password is not matched!!!",
      });
    }
    foundUser.password = newPassword;
    await foundUser.save();
    const userData = {
      name: foundUser.name,
      address: foundUser.address,
      phoneNumber: foundUser.phoneNumber,
      role: foundUser.role,
      role: foundUser.email,
      _id: foundUser._id,
    }
    res.json({
      success: true,
      message: "Password Updated Successfully",
      data: userData,
    })

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
    
  }
}