import mongoose from "mongoose";
import bcrypt from "bcrypt";
import joi from "joi";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String },
  role: { type: String, enum: ["Admin", "Staff", "Member"], default: "Member" },
});
userSchema.method("isPasswordValid", async function (password) {
  const hashedPassword = this.password;
  const result = await bcrypt.compare(password, hashedPassword);
  return result;
});

userSchema.pre("save", async function () {
  const password = this.password;
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  const hashedPassword = await bcrypt.hash(password, salt);
  this.password = hashedPassword;
});

export const validateUserSchema = joi.object({
  name: joi.string().min(3).max(100).required().messages({
    "any.required": "Please enter your name",
    "string.empty": "Please enter your name",
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must not exceed 100 characters",
  }),
  email: joi.string().email().required().messages({
    "string.email": "Please enter a valid email",
    "any.required": "Email is required",
  }),
  password: joi
    .string()
    .pattern(
      new RegExp(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]{8,20}$/)
    )
    .min(8)
    .max(20)
    .required()
    .messages({
      "string.pattern.base":
        "Password must be 8-20 characters with valid symbols",
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password must not exceed 20 characters",
      "any.required": "Password is required",
    }),
  phoneNumber: joi
    .string()
    .pattern(/^\+?\d{1,3}?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}$/)
    .required()
    .messages({
      "string.pattern.base": "Please enter a valid phone number",
      "any.required": "Phone number is required",
    }),
  address: joi.string().optional(),
});

export const UserModel = mongoose.model("users", userSchema);
