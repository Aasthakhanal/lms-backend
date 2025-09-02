import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  isbn: String,
  publicationDate: Date,
  genre: String,
  noOfPages: Number,
  availability: {
    type: Boolean,
    default: true,
  },
});

export const BookModel = mongoose.model("books", bookSchema);
