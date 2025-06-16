import express from 'express';
import { getBooksController, createBookController, updateBookController, deleteBookController } from '../controllers/bookController.js'


const bookRouter = express.Router();

bookRouter.route('/')
.get(getBooksController)
.post(createBookController)

bookRouter.route('/:id')
.put(updateBookController)
.delete(deleteBookController)

export default bookRouter;