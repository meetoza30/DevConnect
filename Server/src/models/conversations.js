import mongoose, {Schema, Model} from "mongoose";

const conversationSchema  = new Schema({
    roomId : {type : String, required : true, unique : true},
    members : [{
            type: mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }],
    lastMessage : {
        text: String,
        senderId : mongoose.Schema.Types.ObjectId,
        timestamp: { type: Date, default: Date.now }
    }
}, {
   timestamps : true
})

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation