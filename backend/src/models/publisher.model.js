import mongoose,  {Schema } from "mongoose";

const publisherSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    address: { 
        type: String 
    }
  }, { timestamps: true });

export const Publisher = mongoose.model("Publisher", publisherSchema)