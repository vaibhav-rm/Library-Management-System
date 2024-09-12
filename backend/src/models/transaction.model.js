import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema({
    status: { 
        type: String, 
        required: true, 
        enum: ['borrowed', 'returned', 'overdue'] 
    },
    borrowDate: { 
        type: Date, 
        required: true 
    },
    dueDate: { 
        type: Date, 
        required: true 
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
    }
  }, { timestamps: true });

export const Transaction = mongoose.model("Transaction", transactionSchema)