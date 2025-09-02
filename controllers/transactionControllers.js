import { BookModel } from "../models/bookModel.js";
import { TransactionModel } from "../models/transactionModel.js";

export const getTransactions = async (req, res) => {
  try {
    const user = req.user;

    if (user.role === "Member") {
      const transactions = await TransactionModel.find({ issuedTo: user._id })
        .populate("issuedBy")
        .populate("issuedTo")
        .populate("book")
        .populate("returnedTo")
        .sort({
          issueDate: -1,
        });

      return res.json({
        success: true,
        data: transactions,
      });
    }

    const transactions = await TransactionModel.find()
      .populate("issuedBy")
      .populate("issuedTo")
      .populate("book")
      .populate("returnedTo")
      .sort({
        issueDate: -1,
      });

    return res.json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const createTransaction = async (req, res) => {
  try {
    const { bookId, issuedTo, estimatedReturnDate } = req.body;
    const requestingUser = req.user;
    const defaultIssuanceAllowedDays = 14;
    const defaultEstimatedReturnDate = new Date(
      Date.now() + defaultIssuanceAllowedDays * 24 * 60 * 60 * 1000
    ).toISOString();

    if (!bookId) {
      return res.json({
        success: false,
        message: "No book issued if no book needed!",
      });
    }

    if (!issuedTo) {
      return res.json({
        success: false,
        message: "No book issued if no reader exists!",
      });
    }

    const bookExists = await BookModel.findById(bookId);

    if (!bookExists || !bookExists.availability) {
      return res.json({
        success: false,
        message: "Requested Book is not available at the moment!",
      });
    }

    const newTransaction = await TransactionModel.create({
      issuedBy: requestingUser._id,
      issuedTo,
      book: bookId,
      status: requestingUser.role === "Member" ? "Pending" : "Approved",
      estimatedReturnDate: estimatedReturnDate || defaultEstimatedReturnDate,
    });

    bookExists.availability = false;

    await bookExists.save();

    return res.json({
      success: true,
      data: newTransaction,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;

    if (!transactionId) {
      return res.json({
        success: false,
        message: "Please mention the issue order!",
      });
    }

    const transaction = await TransactionModel.findById(transactionId);

    if (!transaction) {
      return res.json({
        success: false,
        message: "Looks like the issue order doesnot exist!",
      });
    }

    const updatedTransaction = await TransactionModel.findByIdAndUpdate(
      transactionId,
      req.body,
      {
        new: true,
      }
    );

    return res.json({
      success: true,
      data: updatedTransaction,
      message: "Issue order Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const updateTransactionStatus = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const { status } = req.body;

    if (!transactionId) {
      return res.json({
        success: false,
        message: "Please mention the issue order!",
      });
    }

    if (!status) {
      return res.json({
        success: false,
        message: "Updated status is required",
      });
    }

    const transaction = await TransactionModel.findById(transactionId);

    if (!transaction) {
      return res.json({
        success: false,
        message: "Looks like the issue order doesnot exist!",
      });
    }

    transaction.status = status;

    await transaction.save();

    return res.json({
      success: true,
      data: transaction,
      message: "Issue order Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;

    if (!transactionId) {
      return res.json({
        success: false,
        message: "Please mention the issue order!",
      });
    }

    const transaction = await TransactionModel.findById(transactionId);

    if (!transaction) {
      return res.json({
        success: false,
        message: "Looks like the issue order doesnot exist!",
      });
    }

    await TransactionModel.findByIdAndDelete(transactionId);

    return res.json({
      success: true,
      message: "Issue order deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const returnBook = async (req, res) => {
  try {
    const { transactionId } = req.params;

    const foundTransaction = await TransactionModel.findById(transactionId)
      .populate("book")
      .populate("issuedTo")
      .populate("issuedBy");

    if (!foundTransaction) {
      return res.json({
        success: false,
        message: "No issue order found!!!",
      });
    }

    foundTransaction.returnDate = Date.now();

    foundTransaction.returned = true;
    foundTransaction.returnedTo = req.user._id;

    const issuedBook = await BookModel.findById(foundTransaction.book._id);

    issuedBook.availability = true;

    await foundTransaction.save();

    await issuedBook.save();

    foundTransaction.returnedTo = req.user;

    res.json({
      success: true,
      message: "Book returned Successfully!!!",
      data: foundTransaction,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
