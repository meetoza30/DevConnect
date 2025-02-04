import mongoose, {Schema, Model} from "mongoose";

const conversationSchema  = new Schema({
    members : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ],
    lastMessage : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Message'
    },
    lastMessageTimestamp : {
        type : Date,
        default : Date.now
    }
}, {
    timeseries : true
})

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation