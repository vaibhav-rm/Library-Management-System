// book.model.js
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  author: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true,
  }],
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true,
  },
  copies: {
    type: Number,
    required: true,
    min: 0,
  },
  borrowedCopies: {
    type: Number,
    default: 0,
    min: 0,
  },
  location: {
    type: String,
    trim: true,
  },
  // New fields from Google Books API
  description: {
    type: String,
    trim: true,
  },
  publishedDate: {
    type: String,
  },
  pageCount: {
    type: Number,
  },
  categories: [{
    type: String,
  }],
  averageRating: {
    type: Number,
    min: 0,
    max: 5,
  },
  imageLinks: {
    smallThumbnail: String,
    thumbnail: String,
  },
  language: {
    type: String,
  },
}, { timestamps: true });

export const Book = mongoose.model("Book", bookSchema);