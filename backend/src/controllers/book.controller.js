// book.controller.js
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { Book } from "../models/book.model.js";
import mongoose from "mongoose";
import axios from 'axios';

const fetchGoogleBooksData = async (isbn) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
      const bookData = response.data.items?.[0]?.volumeInfo;
      if (!bookData) {
        return null;
      }
      return {
        description: bookData.description,
        publishedDate: bookData.publishedDate,
        pageCount: bookData.pageCount,
        categories: bookData.categories,
        averageRating: bookData.averageRating,
        imageLinks: bookData.imageLinks,
        language: bookData.language,
      };
    } catch (error) {
      console.error("Error fetching Google Books data:", error);
      return null;
    }
  };

const addBook = asyncHandler(async (req, res) => {
  const { title, isbn, author, branch, copies, location } = req.body;

  if (!title || !isbn || !author || !branch || !copies) {
    throw new ApiError(400, "All required fields must be provided");
  }

  if (!Array.isArray(author)) {
    throw new ApiError(400, "Author must be an array of IDs");
  }

  const existingBook = await Book.findOne({ isbn });
  if (existingBook) {
    throw new ApiError(409, "A book with this ISBN already exists");
  }

  const googleBooksData = await fetchGoogleBooksData(isbn);

  const bookData = {
    title,
    isbn,
    author,
    branch,
    copies,
    location,
    ...googleBooksData,
  };

  const book = await Book.create(bookData);

  const populatedBook = await Book.findById(book._id)
    .populate('author', 'name')
    .populate('branch', 'name');

  return res.status(201).json(
    new ApiResponse(201, populatedBook, "Book added successfully")
  );
});

const updateBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let updateData = req.body;

  // Validate update data
  const allowedUpdates = ['title', 'author', 'branch', 'copies', 'location', 'description', 'publishedDate', 'pageCount', 'categories', 'averageRating', 'imageLinks', 'language'];
  const updates = Object.keys(updateData);
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    console.error('Invalid update fields:', updates);
    throw new ApiError(400, "Invalid updates!");
  }

  // Ensure author is an array of ObjectId
  if (updateData.author && Array.isArray(updateData.author)) {
    updateData.author = updateData.author.map(author => typeof author === 'object' ? author._id : author);
  }

  // Optionally add extra field validation here for copies, pageCount, etc.

  const book = await Book.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
    .populate('author', 'name')
    .populate('branch', 'name');

  if (!book) {
    throw new ApiError(404, "Book not found");
  }

  return res.status(200).json(
    new ApiResponse(200, book, "Book updated successfully")
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

const getBookById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid book ID");
  }

  const book = await Book.findById(id);

  if (!book) {
    throw new ApiError(404, "Book not found");
  }

  return res.status(200).json(
    new ApiResponse(200, book, "Book fetched successfully")
  );
});

const getAllBooks = asyncHandler(async (req, res) => {
  const books = await Book.find()
    .populate('author', 'name')
    .populate('branch', 'name');

  return res.status(200).json(
    new ApiResponse(200, books, "Books fetched successfully")
  );
});

export { addBook, getAllBooks, getBookById, updateBook, deleteBook };