import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Transaction } from "../models/transaction.model.js";
import { User } from "../models/user.model.js";
import { Book } from "../models/book.model.js";

const addTransaction = asyncHandler(async (req, res) => {
    const { bookId } = req.body;
    const userId = req.user._id;

    if (!bookId) {
        throw new ApiError(400, "Book ID is required");
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const book = await Book.findById(bookId);
    if (!book) {
        throw new ApiError(404, "Book not found");
    }

    const transaction = await Transaction.create({
        status: 'pending',
        userId,
        bookId,
        requestDate: new Date()
    });

    return res.status(201).json(
        new ApiResponse(201, transaction, "Borrow request submitted successfully")
    );
});

const getPendingRequests = asyncHandler(async (req, res) => {
    const pendingRequests = await Transaction.find({ status: 'pending' })
        .populate('userId', 'name')
        .populate('bookId', 'title');

    return res.status(200).json(
        new ApiResponse(200, pendingRequests, "Pending requests fetched successfully")
    );
});

const updateTransactionStatus = asyncHandler(async (req, res) => {
    const { transactionId } = req.params;
    const { status } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
        throw new ApiError(400, "Invalid status");
    }

    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
        throw new ApiError(404, "Transaction not found");
    }

    if (transaction.status !== 'pending') {
        throw new ApiError(400, "Only pending transactions can be updated");
    }

    transaction.status = status;

    if (status === 'approved') {
        const book = await Book.findById(transaction.bookId);
        if (book.copies <= book.borrowedCopies) {
            throw new ApiError(400, "No copies available for borrowing");
        }

        book.borrowedCopies += 1;
        await book.save();

        const borrowDate = new Date();
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14); // Set due date to 14 days from now

        transaction.borrowDate = borrowDate;
        transaction.dueDate = dueDate;
    }

    await transaction.save();

    return res.status(200).json(
        new ApiResponse(200, transaction, `Transaction ${status} successfully`)
    );
});

// ... (previous code remains the same)

// ... (previous code remains the same)

const getActiveBorrowings = asyncHandler(async (req, res) => {
    const activeBorrowings = await Transaction.find({ status: { $in: ['approved', 'borrowed'] } })
        .populate('userId', 'name')
        .populate('bookId', 'title');

    return res.status(200).json(
        new ApiResponse(200, activeBorrowings, "Active borrowings fetched successfully")
    );
});

// ... (rest of the code remains the same)
const returnBook = asyncHandler(async (req, res) => {
    const { transactionId } = req.params;

    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
        throw new ApiError(404, "Transaction not found");
    }

    if (transaction.status !== 'borrowed') {
        throw new ApiError(400, "This book is not currently borrowed");
    }

    transaction.status = 'returned';
    transaction.returnDate = new Date();
    await transaction.save();

    const book = await Book.findById(transaction.bookId);
    book.borrowedCopies -= 1;
    await book.save();

    return res.status(200).json(
        new ApiResponse(200, transaction, "Book returned successfully")
    );
});

// ... (previous code remains the same)

const issueBook = asyncHandler(async (req, res) => {
    const { transactionId } = req.params;

    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
        throw new ApiError(404, "Transaction not found");
    }

    if (transaction.status !== 'approved') {
        throw new ApiError(400, "This transaction is not in the approved state");
    }

    transaction.status = 'borrowed';
    transaction.borrowDate = new Date();
    transaction.dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // 14 days from now
    await transaction.save();

    return res.status(200).json(
        new ApiResponse(200, transaction, "Book issued successfully")
    );
});

export { addTransaction, getPendingRequests, updateTransactionStatus, getActiveBorrowings, returnBook, issueBook };
