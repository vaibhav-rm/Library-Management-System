import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Book } from "../models/book.model.js";

const addBook = asyncHandler(async (req, res) => {
    const { title, isbn, description, publicationYear, copies, location, authorIds, branchId } = req.body;

    if (!title || !isbn || !copies || !authorIds || !branchId) {
        throw new ApiError(400, "All required fields must be provided");
    }

    const existingBook = await Book.findOne({ isbn });
    if (existingBook) {
        throw new ApiError(409, "A book with this ISBN already exists");
    }

    const book = await Book.create({
        title,
        isbn,
        description,
        publicationYear,
        copies,
        location,
        authors: authorIds,
        branch: branchId
    });

    return res.status(201).json(
        new ApiResponse(201, book, "Book added successfully")
    );
});

const getAllBooks = asyncHandler(async (req, res) => {
    const books = await Book.find({})
        .populate('authors', 'name')
        .populate('branch', 'name')
        .select('title authors branch');

    return res.status(200).json(
        new ApiResponse(200, books, "Books fetched successfully")
    );
});

export { addBook, getAllBooks };