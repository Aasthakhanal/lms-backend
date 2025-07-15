import express from "express";
import {
  loginUser,
  registerUser,
  updateUser,
  deleteUser,
  updatePassword,
  getProfile,
} from "../controllers/userController.js";
import { checkauthorization } from "../middleware/checkauthorization.js";

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router
  .route("/:userId")
  .put(checkauthorization, updateUser).patch(checkauthorization, updatePassword)
  .delete(checkauthorization, deleteUser);

  router.route("/profile").post(checkauthorization,getProfile);
export default router;