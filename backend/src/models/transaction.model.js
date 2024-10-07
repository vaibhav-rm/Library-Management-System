import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema({
    status: { 
        type: String, 
        required: true, 
        enum: ['pending', 'approved', 'rejected', 'borrowed', 'returned', 'overdue'] 
    },
    borrowDate: { 
        type: Date
    },
    dueDate: { 
        type: Date
    },
    returnDate: { 
        type: Date 
    },
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    bookId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Book', 
        required: true 
    },
    requestDate: {
        type: Date,
        required: true,
        default: Date.now
    }
}, { timestamps: true });

export const Transaction = mongoose.model("Transaction", transactionSchema);