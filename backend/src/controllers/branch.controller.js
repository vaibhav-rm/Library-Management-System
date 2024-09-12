import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Branch } from "../models/branch.model.js";

const addBranch = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    if (!name) {
        throw new ApiError(400, "Branch name is required");
    }

    const branch = await Branch.create({
        name,
        description
    });

    return res.status(201).json(
        new ApiResponse(201, branch, "Branch added successfully")
    );
});

const getAllBranches = asyncHandler(async (req, res) => {
    const branches = await Branch.find({}).select('name');
    return res.status(200).json(
        new ApiResponse(200, branches, "Branches fetched successfully")
    );
});

export { addBranch, getAllBranches };