import express from "express";
import { registerUser } from "../controllers/userController.js";
import { loginUser } from "../controllers/userController.js";

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
export default router;