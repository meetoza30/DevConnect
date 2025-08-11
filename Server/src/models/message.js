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
    text : {
        type : String, 
        required : true
    },
    timestamps : { // Keep this field name consistent
        type : Date,
        default : Date.now
    }
}, {
    timestamps : true // This adds createdAt and updatedAt
});

const Message = mongoose.model('Message', messageSchema);
export default Message;
