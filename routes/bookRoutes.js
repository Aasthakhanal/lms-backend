import express from 'express';
import { getBooksController, createBookController, updateBookController, deleteBookController } from '../controllers/bookController.js'
import { checkauthorization } from '../middleware/checkauthorization.js';
import { checkStaffLevelPermissions } from "../middleware/CheckPermissions.js";


const bookRouter = express.Router();

bookRouter
  .route("/")
  .get(
    // checkauthorization, 
    getBooksController)
  .post(checkauthorization, checkStaffLevelPermissions, createBookController);

bookRouter
  .route("/:id")
  .put(checkauthorization, updateBookController)
  .delete(checkauthorization, deleteBookController);

export default bookRouter;