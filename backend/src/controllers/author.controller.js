import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Author } from "../models/author.model.js";

const addAuthor = asyncHandler(async (req, res) => {
    const { name, bio } = req.body;

    if (!name) {
        throw new ApiError(400, "Author name is required");
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
    const authors = await Author.find({}).select('name');
    return res.status(200).json(
        new ApiResponse(200, authors, "Authors fetched successfully")
    );
});

export { addAuthor, getAllAuthors };