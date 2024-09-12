import mongoose, {Schema} from "mongoose";

const fineSchema = new Schema({
    amount: { 
        type: Number, 
        required: true 
    },
    reason: { 
        type: String, 
        required: true 
    },
    paid: { 
        type: Boolean, 
        default: false 
    },
    paidDate: { 
        type: Date 
    },
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
  }, { timestamps: true });

export const Fine = mongoose.model("Fine", fineSchema)