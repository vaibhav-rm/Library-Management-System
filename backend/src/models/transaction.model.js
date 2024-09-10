import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const transactionSchema = new Schema({
    transactionType: {
        type: String,
        enum: [ "borrow", "return", "reserve"],
        required: true,
        lowercase: true,
        trim: true,
        index: true
    },
    transactionDate: {
        type: Date,
        value: Date.now,
        required: true,
        lowercase: true,
        trim: true,
    },
    dueDate: {
        type: Date
    },
    returnDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ["pending", ] 
    }

})

export const Transaction = mongoose.model("Transaction", transactionSchema)