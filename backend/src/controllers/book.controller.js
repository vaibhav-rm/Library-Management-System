// book.controller.js
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { Book } from "../models/book.model.js";
import mongoose from "mongoose";

const addBook = asyncHandler(async (req, res) => {
    const { title, isbn, publicationYear, copies, location, author, branch } = req.body;

    if (!title || !isbn || !publicationYear || !copies || !author || !branch) {
        throw new ApiError(400, "All required fields must be provided");
    }

    if (!Array.isArray(author) || author.length === 0) {
        throw new ApiError(400, "At least one author must be provided");
    }

    if (!mongoose.Types.ObjectId.isValid(branch)) {
        throw new ApiError(400, "Invalid branch ID");
    }

    const existingBook = await Book.findOne({ isbn });
    if (existingBook) {
        throw new ApiError(409, "A book with this ISBN already exists");
    }

    const book = await Book.create({
        title,
        isbn,
        publicationYear,
        copies,
        borrowedCopies: 0,
        location,
        author,
        branch
    });

    const populatedBook = await Book.findById(book._id)
        .populate('author', 'name')
        .populate('branch', 'name')
        .lean();

    return res.status(201).json(
        new ApiResponse(201, populatedBook, "Book added successfully")
    );
});

const getAllBooks = asyncHandler(async (req, res) => {
    const books = await Book.find({})
        .populate('author', 'name')
        .populate('branch', 'name')
        .lean();

    return res.status(200).json(
        new ApiResponse(200, books, "Books fetched successfully")
    );
});

const updateBook = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, isbn, publicationYear, copies, location, author, branch } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid book ID");
    }

    if (!title || !isbn || !publicationYear || !copies || !author || !branch) {
        throw new ApiError(400, "All required fields must be provided");
    }

    if (!Array.isArray(author) || author.length === 0) {
        throw new ApiError(400, "At least one author must be provided");
    }

    if (!mongoose.Types.ObjectId.isValid(branch)) {
        throw new ApiError(400, "Invalid branch ID");
    }

    const existingBook = await Book.findOne({ isbn, _id: { $ne: id } });
    if (existingBook) {
        throw new ApiError(409, "A book with this ISBN already exists");
    }

    const updatedBook = await Book.findByIdAndUpdate(
        id,
        { title, isbn, publicationYear, copies, location, author, branch },
        { new: true, runValidators: true }
    ).populate('author', 'name').populate('branch', 'name');

    if (!updatedBook) {
        throw new ApiError(404, "Book not found");
    }

    return res.status(200).json(
        new ApiResponse(200, updatedBook, "Book updated successfully")
    );
});

const deleteBook = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid book ID");
    }

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
        throw new ApiError(404, "Book not found");
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Book deleted successfully")
    );
});

export { addBook, getAllBooks, updateBook, deleteBook };