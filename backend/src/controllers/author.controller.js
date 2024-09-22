import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Author } from "../models/author.model.js";
import mongoose from "mongoose";

// Add a new author
const addAuthor = asyncHandler(async (req, res) => {
    const { name, bio } = req.body;

    if (!name) {
        throw new ApiError(400, "Author name is required");
    }

    // Check for existing author (case-insensitive)
    const existingAuthor = await Author.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (existingAuthor) {
        throw new ApiError(400, "An author with this name already exists");
    }

    const author = await Author.create({ name, bio });

    return res.status(201).json(
        new ApiResponse(201, author, "Author added successfully")
    );
});

// Get all authors
const getAllAuthors = asyncHandler(async (req, res) => {
    const authors = await Author.find({});
    return res.status(200).json(
        new ApiResponse(200, authors, "Authors fetched successfully")
    );
});

// Update an existing author
const updateAuthor = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, bio } = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid author ID");
    }

    // Check for name in the request body
    if (!name) {
        throw new ApiError(400, "Author name is required");
    }

    // Find author with the same name (case-insensitive), excluding the one being updated
    const existingAuthor = await Author.findOne({ 
        name: { $regex: new RegExp(`^${name}$`, 'i') },
        _id: { $ne: id }  // Exclude the current author
    });
    if (existingAuthor) {
        throw new ApiError(400, "An author with this name already exists");
    }

    // Update author
    const updatedAuthor = await Author.findByIdAndUpdate(
        id,
        { name, bio },
        { new: true, runValidators: true }
    );

    if (!updatedAuthor) {
        throw new ApiError(404, "Author not found");
    }

    return res.status(200).json(
        new ApiResponse(200, updatedAuthor, "Author updated successfully")
    );
});

// Delete an author
const deleteAuthor = asyncHandler(async (req, res) => {
    const { id } = req.params;

    console.log(`Attempting to delete author with id: '${id}'`);

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log(`Invalid author ID: ${id}`);
        throw new ApiError(400, "Invalid author ID");
    }

    // Check if the author exists
    const author = await Author.findById(id);
    console.log('Found author:', author);

    if (!author) {
        console.log(`Author not found with id: ${id}`);
        throw new ApiError(404, "Author not found");
    }

    // Delete the author
    await Author.findByIdAndDelete(id);
    console.log(`Author deleted successfully: ${author._id}`);

    return res.status(200).json(
        new ApiResponse(200, null, "Author deleted successfully")
    );
});

const getAuthorById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(`Received ID: ${id}`); // Add this line

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid author ID");
    }

    const author = await Author.findById(id);
    if (!author) {
        throw new ApiError(404, "Author not found");
    }

    return res.status(200).json(
        new ApiResponse(200, author, "Author fetched successfully")
    );
});



export { addAuthor, getAllAuthors, updateAuthor, deleteAuthor, getAuthorById };
