import express from 'express';
import { getBooksController, createBookController, updateBookController, deleteBookController } from '../controllers/bookController.js'
import { checkauthorization } from '../middleware/checkauthorization.js';


const bookRouter = express.Router();

bookRouter.route('/')
.get(checkauthorization, getBooksController)
.post(createBookController)

bookRouter.route('/:id')
.put(updateBookController)
.delete(checkauthorization, deleteBookController)

export default bookRouter;