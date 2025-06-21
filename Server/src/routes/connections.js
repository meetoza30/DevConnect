import express from 'express'
import Req from '../models/reqs.js'
import { connect } from 'mongoose';
import {userAuth} from '../middlewares/auth.js';
import User from '../models/user.js';

const connectionRouter = express.Router();

connectionRouter.post('/reqs/send/:status/:receiverId', userAuth, async (req, res)=>{
    try{const senderId  = req.user._id;
    const receiverId = req.params.receiverId;
    const status = req.params.status;

    

    const allowedStatus = ["interested", "ignore"];
    if(!allowedStatus.includes(status)) throw new Error("Invalid status")
    const receiver = await User.findById(receiverId)
    if(!receiver) throw new Error("User you are trying to send req doesnt exist");
    if(senderId.equals(receiverId)) throw new Error("You can't send req to yourself")
    const existingReq = await Req.findOne({
        $or: [
            {senderId, receiverId},
            {senderId : receiverId, receiverId : senderId}
        ]}
    )
    if(existingReq) throw new Error("Req already exists")
        const request = new Req({
            senderId, receiverId, status
        })
    const reqData = await request.save();
    res.send("Req send successfully");
}
catch(err){
    res.status(400).json({message: "ERROR : " + err.message})
}

})

connectionRouter.patch('/reqs/review/:status/:reqid', userAuth, async (req, res)=>{
    try{const user = req.user;
    const reqid = req.params.reqid;
    const status = req.params.status;
    
    const allowedStatus = ["accepted", "rejected", "withdraw"];
    if(!allowedStatus.includes(status)) throw new Error("Invalid status")
        if(status === "withdraw"){
            const deletedReq = await Req.findByIdAndDelete(reqid)
            res.json({message : "Req withdrawn"});
            return;
        }
    const request = await Req.findById({_id : reqid, receiverId : user._id, status : "interested"});
    if(!request) throw new Error("Req not found")
    
    request.status = status;
    const data = await request.save();

    res.json({message : "Req "+ status, data})

    //14d - rohit
    //bdf - Meet
    
    
    }
    catch(err){
        res.status(400).json({message : "ERROR : "+ err.message})
    }
    
})

export default connectionRouter