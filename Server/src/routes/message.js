import express from 'express'
import { Socket, Server } from 'socket.io'
import {userAuth} from '../middlewares/auth.js'
import {createServer} from 'http'
import cors from 'cors'
import Conversation from '../models/conversations.js'
import Message from '../models/message.js'

const messageRouter = express.Router();
messageRouter.post('/conversation/create', userAuth, async (req, res)=>{
    try {
        const user = req.user;
        const memberId = req.body.membersId;

        let conversation = await Conversation.findOne({
            members : {
                $all : [user._id, memberId]
            }
        })
        if(!conversation){
            conversation = new Conversation({
                members : [user._id, memberId]
            })
            await conversation.save();
            res.json({message : "Conversation initiated", conversation})
        }
    } catch (error) {
        res.status(400).json({error : error.message})
    }
})

messageRouter.get('/conversation', userAuth, async (req, res)=>{
   try{ 
    const {page, limit, id} = req.query;
    const messages = await Message.find({conversationId : id})
    .sort({createdAt : -1})
    .skip((page - 1)*limit)
    .limit(parseInt(limit))
    .populate('senderId', 'userName')
    res.json(messages)
}
catch(err){
    res.status(400).json({Error : err.message})
}
})

messageRouter.get('/conversations', userAuth, async (req, res)=>{
    try {
        const user = req.user
        const conversations = await Conversation.find({
            members : user._id
        })
        .sort({lastMessageTimestamp : -1})
        .populate('members', 'userName')
        .populate('lastMessage')

        res.json(conversations)
        
    } catch (error) {
        res.status(400).json({error : error.message})
    }
})
export default messageRouter;