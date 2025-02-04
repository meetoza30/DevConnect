import mongoose, { Model, mongo, Schema } from 'mongoose';

const messageSchema = new Schema({
    conversationId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Conversation'
    },
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    receiverId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    msgContent : {
        type : String, 
        required : true
    }
}, {
    timestamps : true
})


const Message  = mongoose.model('Message', messageSchema)

export default Message

