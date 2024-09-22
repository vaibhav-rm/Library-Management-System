// author.controller.js
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Author } from "../models/author.model.js";

const addAuthor = asyncHandler(async (req, res) => {
    const { name, bio } = req.body;

    if (!name) {
        throw new ApiError(400, "Author name is required");
    }

    const existingAuthor = await Author.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (existingAuthor) {
        throw new ApiError(400, "An author with this name already exists");
    }

    const author = await Author.create({
        name,
        bio
    });

    return res.status(201).json(
        new ApiResponse(201, author, "Author added successfully")
    );
});

const getAllAuthors = asyncHandler(async (req, res) => {
    const authors = await Author.find({});
    return res.status(200).json(
        new ApiResponse(200, authors, "Authors fetched successfully")
    );
});

const updateAuthor = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, bio } = req.body;

    if (!name) {
        throw new ApiError(400, "Author name is required");
    }

    const existingAuthor = await Author.findOne({ 
        name: { $regex: new RegExp(`^${name}$`, 'i') },
        _id: { $ne: id }
    });
    if (existingAuthor) {
        throw new ApiError(400, "An author with this name already exists");
    }

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

const deleteAuthor = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const deletedAuthor = await Author.findByIdAndDelete(id);

    if (!deletedAuthor) {
        throw new ApiError(404, "Author not found");
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Author deleted successfully")
    );
});

export { addAuthor, getAllAuthors, updateAuthor, deleteAuthor };