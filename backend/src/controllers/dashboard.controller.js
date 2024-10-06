import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Book } from "../models/book.model.js";
import { User } from "../models/user.model.js"; // Assuming you have a User model
import { Transaction } from "../models/transaction.model.js"; // Assuming you have a Transaction model

const getDashboardStats = asyncHandler(async (req, res) => {
  const totalBooks = await Book.countDocuments();
  const totalUsers = await User.countDocuments();
  const booksBorrowed = await Transaction.countDocuments({ status: 'borrowed' });
  const lateReturns = await Transaction.countDocuments({
    status: 'borrowed',
    dueDate: { $lt: new Date() }
  });

  return res.status(200).json(
    new ApiResponse(200, {
      totalBooks,
      totalUsers,
      booksBorrowed,
      lateReturns
    }, "Dashboard stats fetched successfully")
  );
});

const getBorrowingTrends = asyncHandler(async (req, res) => {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const trends = await Transaction.aggregate([
    { $match: { createdAt: { $gte: sixMonthsAgo }, status: 'borrowed' } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
        Books: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } },
    { $project: { name: "$_id", Books: 1, _id: 0 } }
  ]);

  return res.status(200).json(
    new ApiResponse(200, trends, "Borrowing trends fetched successfully")
  );
});

export { getDashboardStats, getBorrowingTrends };