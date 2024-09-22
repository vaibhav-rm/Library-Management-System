import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Transaction } from "../models/transaction.model.js"
import { User } from "../models/user.model.js"
import { Book } from "../models/book.model.js"

const addTransaction = asyncHandler(async (req, res) => {
    const { status, borrowDate, dueDate, userId, bookId } = req.body

    if (!status || !borrowDate || !dueDate || !userId || !bookId) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findById(userId)
    if (!user) {
        throw new ApiError(404, "User not found")
    }

    const book = await Book.findById(bookId)
    if (!book) {
        throw new ApiError(404, "Book not found")
    }

    const transaction = await Transaction.create({
        status,
        borrowDate,
        dueDate,
        userId,
        bookId
    })

    return res.status(201).json(
        new ApiResponse(201, transaction, "Transaction added successfully")
    )
})

export { addTransaction }