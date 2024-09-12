import mongoose, {Schema} from "mongoose";

const reservationSchema = new Schema({
    reservationDate: { 
        type: Date, 
        default: Date.now 
    },
    expectedAvailableDate: { 
        type: Date 
    },
    status: { 
        type: String, required: 
        true, enum: ['active', 'cancelled', 'completed'] 
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

  export const Reservation = mongoose.model("Reservation", reservationSchema)