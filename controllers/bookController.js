import { BookModel } from "../models/bookModel.js";
import { decodeJWt } from "../utils/generateToken.js";

export const getBooksController = async (req, res) => {
  try {
    //YO GARNU PARDAINA MIDDLEWARE LA HANDLE GARXAA
    // const jwtToken = req?.body?.token;
    // const foundUser = await decodeJWt(jwtToken);
    // console.log(foundUser)
    // if (!foundUser) {
    //   return res.json({
    //     success: false,
    //     message: "You are not authorized!!",
    //   })
    // }
    const user = req.user;
    const books = await BookModel.find();

    return res.json({
      success: true,
      message: "This is the books root route",
      data: books,

      userInfo: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const createBookController = async (req, res) => {
  try {
    const reqBody = req.body;
    const book = await BookModel.create(reqBody);
    res.json({
      success: true,
      message: "This is create route",
      data: book,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateBookController = async (req, res) => {
  try {
    const { id: bookId } = req.params;
    const reqBody = req.body;
    const foundBook = await BookModel.findById(bookId);

    console.log(reqBody);

    if (foundBook) {
      console.log("book found");
      const updatedBook = await BookModel.findByIdAndUpdate(bookId, reqBody, {
        new: true,
        //update bhaisakeko information awoss bnera gareko ho new:true
      });
      console.log(updatedBook.title);
      return res.json({
        success: true,
        data: updatedBook,
      });
    }
    res.json({
      success: false,
      message: `Book with id: ${bookId} not found`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBookController = async (req, res) => {
  try {
    const { id: bookId } = req.params;
    const reqBody = req.body;

    const foundBook = await BookModel.findById(bookId);

    if (foundBook) {
      const deletedBook = await BookModel.findByIdAndDelete(bookId, reqBody, {
        new: true,
      });
      return res.json({
        success: true,
        data: deletedBook,
      });
    }import { BookModel } from "../models/bookModel.js";
    import { decodeJWT } from "../utils/generateToken.js";

    export const getBooksController = async (req, res) => {
      try {
        const user = req.user;
        const books = await BookModel.find();

        return res.json({
          success: true,
          data: books,

          userInfo: user,
        });
      } catch (error) {
        console.log(error);
        res.json({
          success: false,
          message: error.message,
        });
      }
    };

    export const createBookController = async (req, res) => {
      try {
        const reqBody = req.body;

        const book = await BookModel.create(reqBody);

        res.json({
          success: true,
          data: book,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    };

    export const updateBookController = async (req, res) => {
      try {
        const { id: bookId } = req.params;
        const reqBody = req.body;

        const foundBook = await BookModel.findById(bookId);

        if (foundBook) {
          const updatedBook = await BookModel.findByIdAndUpdate(
            bookId,
            reqBody,
            {
              new: true,
            }
          );

          return res.json({
            success: true,
            data: updatedBook,
          });
        }

        res.json({
          success: false,
          message: `Book with id: ${bookId} not found!`,
        });
      } catch (error) {
        console.log(error);
        res.json({
          success: false,
          message: error.message,
        });
      }
    };

    export const deleteBookController = async (req, res) => {
      try {
        const { id: bookId } = req.params;

        const foundBook = await BookModel.findById(bookId);

        if (foundBook) {
          await BookModel.findByIdAndDelete(bookId);

          return res.json({
            success: true,
            message: `${foundBook.title} has been deleted successfully!`,
          });
        }

        res.json({
          success: false,
          message: `Book with id: ${bookId} not found!`,
        });
      } catch (error) {
        console.log(error);
        res.json({
          success: false,
          message: error.message,
        });
      }
    };
    res.json({
      success: false,
      message: `Book with id: ${bookId} not found`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
