import express from "express";
import {
  getBooksController,
  createBookController,
  updateBookController,
  deleteBookController,
} from "../controllers/bookControllers.js";
import { checkAuthorization } from "../middleware/checkAuthorization.js";
import { checkStaffLevelPermissions } from "../middleware/CheckPermissions.js";

const bookRouter = express.Router();

bookRouter
  .route("/")
  .get(getBooksController)
  .post(checkAuthorization, checkStaffLevelPermissions, createBookController);

bookRouter
  .route("/:id")
  .put(checkAuthorization, updateBookController)
  .delete(checkAuthorization, deleteBookController);

export default bookRouter;
