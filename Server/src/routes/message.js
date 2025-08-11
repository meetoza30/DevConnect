import express from 'express'
import { Socket, Server } from 'socket.io'
import {userAuth} from '../middlewares/auth.js'
import {createServer} from 'http'
import cors from 'cors'
import Conversation from '../models/conversations.js'
import Message from '../models/message.js'

const messageRouter = express.Router();

messageRouter.get('/convos/:receiverid', userAuth, async (req, res)=>{
    try{
        const {receiverid} = req.params;
        const userid = req.user._id;
        
        // Add pagination parameters with defaults
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        
        const roomId = [userid, receiverid].sort().join("_");
        const conversation = await Conversation.findOne({roomId});
        
        if (!conversation) {
            return res.json({messages: []});
        }
        
        const messages = await Message
            .find({conversationId : conversation._id})
            .sort({timestamps : 1}) // Fixed field name
            .limit(limit * 1)
            .skip((page - 1) * limit);

        res.json({messages});
    } catch(err){
        console.log(err);
        res.status(500).json({error: 'Failed to fetch messages'});
    }
})

messageRouter.get('/get-conversations', userAuth, async (req,res)=>{
    try{ 
        const userid = req.user._id;
        const conversations = await Conversation.find(
            {members : {$in : [userid]}}
        )
        .populate("members", "fullName profileUrl username") // Added fullName
        .sort({updatedAt : -1});
        
        
        const formattedConversations = conversations.map(conv => ({
            ...conv.toObject(),
            participants: conv.members 
        }));
        
        res.json({conversations: formattedConversations});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Failed to fetch conversations'});
    }
})

export default messageRouter;
