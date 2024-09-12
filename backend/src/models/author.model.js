import mongoose, {Schema} from "mongoose";

const authorSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    bio: { 
        type: String 
    }
  }, { timestamps: true });

export const Author = mongoose.model("Author", authorSchema)