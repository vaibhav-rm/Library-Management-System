import mongoose, { Schema } from "mongoose";

const branchSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    address: { 
        type: String, 
        required: true 
    }
  }, { timestamps: true });

export const Branch = mongoose.model("Branch", branchSchema)