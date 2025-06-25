import express from "express";
import { registerUser } from "../controllers/userController.js";
import { loginUser } from "../controllers/userController.js";
import {
  loginUser,
  registerUser,
  updateUser,
  deleteUser,
} from "../controllers/userControllers.js";
import { checkauthorization } from "../middleware/checkauthorization.js";

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router
  .route("/:userId")
  .put(checkAuthorization, updateUser)
  .delete(checkAuthorization, deleteUser);
export default router;