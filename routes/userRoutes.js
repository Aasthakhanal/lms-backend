import express from "express";
import {
  loginUser,
  registerUser,
  updateUser,
  deleteUser,
  updatePassword,
  getProfile,
} from "../controllers/userControllers.js";
import { checkAuthorization } from "../middleware/checkAuthorization.js";

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router
  .route("/:userId")
  .put(checkAuthorization, updateUser)
  .patch(checkAuthorization, updatePassword)
  .delete(checkAuthorization, deleteUser);

router.route("/profile").get(checkAuthorization, getProfile);

export default router;
