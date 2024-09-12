import mongoose, {Schema} from "mongoose";

const notificationSchema = new Schema({
    message: { 
        type: String, 
        required: true 
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    read: { 
        type: Boolean, 
        default: false 
    },
    notificationType: { 
        type: String, 
        required: true 
    },
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }   
  }, { timestamps: true });                     

  export const Notification = mongoose.model("Notificaton", notificationSchema)