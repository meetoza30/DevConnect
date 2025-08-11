import { Server } from "socket.io";
import Message from "../models/message.js";
import Conversation from "../models/conversations.js";

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"]
        },
    });

    io.on("connection", async (socket) => {
        console.log("User connected:", socket.id);
        
        socket.on("joinChat", async ({userId, receiverId}) => {
            console.log("Join chat:", userId, receiverId);
            const room = [userId, receiverId].sort().join("_");
            
            try{
                let conversation = await Conversation.findOne({roomId : room});
                if(!conversation) {
                    conversation = new Conversation({
                        roomId : room,
                        members : [userId, receiverId]
                    });
                    await conversation.save();
                }
                
                console.log("Joined room:", room);
                socket.join(room);
            }
            catch(err){
                console.log("Error joining chat:", err);
            }
        });
        
        socket.on("sendMessage", async (messageData) => {
            try {
                const {senderId, receiverId, message, senderName} = messageData;
                const room = [senderId, receiverId].sort().join("_");
                let conversation = await Conversation.findOne({roomId : room});

                if(conversation){
                    const newMessage = new Message({
                        conversationId : conversation._id,
                        senderId : senderId,
                        text : message,
                        timestamps : new Date() 
                    });

                    await newMessage.save();

                    // Update conversation's last message
                    conversation.lastMessage = {
                        text : newMessage.text,
                        timestamp : new Date(),
                        senderId : senderId
                    };
                    await conversation.save();
                    
                    console.log("Message saved and sent to room:", room);
                    io.to(room).emit("messageReceived", {
                        messageData: {
                            ...messageData,
                            _id: newMessage._id,
                            timestamps: newMessage.timestamps
                        }
                    });
                }
            } catch (err) {
                console.log("Error sending message:", err);
            }
        });
        
        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};

export default initializeSocket;
