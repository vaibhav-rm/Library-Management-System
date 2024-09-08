import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "Author",
        required: true,
        lowercase: true,
        trim: true,
    },
    isbn: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    genre: [
        {
            type: Schema.Types.ObjectId,
            ref: "Genre",
            required: true,
            lowercase: true,
            trim: true,
        }
    ],
    publicationYear: {
        type: Number,
        required: true,
    },
    copies: {
        type: Number,
        required: true,
    },
    borrowedCopies: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
    }
}, {timestamps :true})

bookSchema.plugin(mongooseAggregatePaginate)

export const Book = mongoose.model("Book", bookSchema)