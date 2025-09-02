import { BookModel } from "../models/bookModel.js";

export const bookServices = {
  getBooks: async (req, res) => {
    const books = await BookModel.find();

    return { books };
  },
};
