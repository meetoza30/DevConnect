import Conversation from '../models/conversations.js'
import Message from '../models/message.js'

const activeUsers = new Map();

const handleMessage = async (conversationId, msgContent, sender)=>{
    try {
        const conversation = await Conversation.findById(conversationId)
        if(!conversation) throw new Error("Conversation doesnt exist")
        
        const message = await Message.create({
            senderId : sender,
            msgContent,
            conversationId
        })

        await Conversation.updateOne({_id : conversationId}, {
            lastMessageTimestamp : message.createdAt,
            lastMessage : message._id
        })

        const populatedMsg = await message.populate('senderId', 'userName')
        return {message : populatedMsg, conversation}
    } catch (error) {
        console.error(error.message)
    }
}

const initiateSocket = (io)=>{
    io.on('connection', (socket)=>{
        socket.on('user_connected', (userId)=>{
            activeUsers.set(userId, socket.id)
            console.log('User connected' + userId)
        })

        socket.on('send_message', async (conversationId, msgContent)=>{
            try{const sender = socket.user._id;
            const {conversation, message} = await handleMessage({
                conversationId, msgContent, sender
            })
        conversation.members.forEach(memberId => {
            if(memberId.toString() !== sender.toString()){
                const receiverSocketId = activeUsers.get(memberId.toString());
                if(receiverSocketId){
                    io.to(receiverSocketId).emit('new_message', {message});
                }
            }
        });
    }catch(err){
        socket.emit('error', {error : err.message})
    }
        })
    })
}