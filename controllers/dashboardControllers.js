import { BookModel } from "../models/bookModel.js";
import { TransactionModel } from "../models/transactionModel.js";
import { UserModel } from "../models/userModel.js";

export const getDashboardData = async (req, res) => {
  try {
    const bookCount = await BookModel.countDocuments();

    const membersCount = await UserModel.countDocuments({ role: "Member" });

    const issuedBooksCount = await TransactionModel.countDocuments({
      returned: false,
    });

    const returnDueCount = await TransactionModel.countDocuments({
      estimatedReturnDate: {
        $lt: Date.now(),
      },
      returned: false,
    });

    res.status(200).json({
      success: true,
      data: {
        bookCount,
        membersCount,
        issuedBooksCount,
        returnDueCount,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
