import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Joi from "joi";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: String,

  role: {
    type: String,
    enum: ["Admin", "Staff", "Member"],
    default: "Member",
  },
});

userSchema.method("isPasswordValid", async function (password) {
  const hashedPassword = this.password;

  const result = await bcrypt.compare(password, hashedPassword);

  return result;
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const password = this.password;
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  const hashedPassword = await bcrypt.hash(password, salt);

  this.password = hashedPassword;
});

export const validateUserSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Please provide a valid name",
    "sting.min": "Name Should be Longer",
    "string.max": "Please enter a valid name",
  }),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]{8,30}$/)
    .required(),
  phoneNumber: Joi.string()
    .pattern(/^\+?\d{1,3}?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}$/)
    .required(),
  address: Joi.string().optional(),
});

export const UserModel = mongoose.model("users", userSchema);
