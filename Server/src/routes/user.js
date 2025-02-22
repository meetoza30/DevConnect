import express from 'express'
import userAuth from '../middlewares/auth.js';
import Req from '../models/reqs.js';
import User from '../models/user.js';

const userRouter = express.Router();

userRouter.get('/user/reqs/received', userAuth, async (req, res)=>{
   try {const user = req.user;
    const reqs = await Req.find({
        receiverId : user._id,
        status : "interested"
    }).populate("senderId", "fullName userName skills bio profileUrl")
    if(!reqs) throw new Error("No reqs available")

    res.json({
        message : "Here are the reqs",
        reqs
    })
}
catch(err){
    res.status(400).json({
        message : "ERROR : "+ err.message
    })
}
})

userRouter.get('/user/reqs/sent', userAuth, async (req, res)=>{
      try  {const user = req.user;
        const sentReqs = await Req.find(
            {senderId : user._id, status : "interested"}
        ).populate("receiverId", "fullName userName profileUrl skills bio")
        if(!sentReqs) throw new Error ("Reqs not available")
        res.json({reqs : sentReqs})
    }
catch(err){
    res.status(400).json({message : "ERROR : "+ err.message})
}

})

userRouter.get('/user/connections', userAuth, async (req, res) => {
    try {
        const user = req.user;
 
        const receivedConnections = await Req.find({
            receiverId: user._id, status: "accepted"
        }).select("senderId")
        .populate("senderId", "fullName userName profileUrl skills bio");
 
        const sentConnections = await Req.find({
            senderId: user._id, status: "accepted"
        }).select("receiverId")
        .populate("receiverId", "fullName userName profileUrl skills bio");
 
        // Flatten the connections into one array
        let connections = [
            ...receivedConnections.map(i => i.senderId), 
            ...sentConnections.map(i => i.receiverId)
        ];
 
        if (connections.length === 0) throw new Error("No connections available");
 
        res.json({
            message: "Here are the connections",
            connections
        });
    } catch (err) {
        res.status(404).json({
            message: "ERROR: " + err.message
        });
    }
 });
 

userRouter.get('/feed', userAuth, async (req, res)=>{
    const SAFE_DATA = "firstName lastName userName profileUrl bio skills"
    try{
        
        const user = req.user;
        const connectionReqs = await Req.find(
            {
                $or : [
                    {senderId : user._id},
                    {receiverId : user._id}
                ]
            }
        ).select("senderId receiverId")


      const hideFromFeed = new Set();
      connectionReqs.forEach(element => {
        hideFromFeed.add(element.senderId.toString())
        hideFromFeed.add(element.receiverId.toString())
      });
      hideFromFeed.add(req.user._id.toString())
      const feedData = await User.find({
            _id : { $nin : Array.from(hideFromFeed)}
        }).select(SAFE_DATA)
      
        res.json({feedData})
    }
    catch(err){
        res.json({error : err.message})
    }
})

userRouter.get('/feed/:college', userAuth,async (req, res)=>{
    try{
        const user = req.user;
        const clg = req.query.college.toString()
        const connectionReqs = await Req.find({
            $or : [
                {senderId : user._id},
                {receiverId : user._id}
            ]
        }).select('senderId receiverId');
        const hideFromFeed = new Set()
        connectionReqs.forEach(ele => {
            hideFromFeed.add(ele.senderId.toString())
            hideFromFeed.add(ele.receiverId.toString())
        })

        const feedUsers = await User.find({
            _id : {$nin : Array.from(hideFromFeed)},
            college : clg
        })

        if(!feedUsers) throw new Error("Nothing to show here")
        res.json({data : feedUsers})
    }
    catch(err){
        res.status(400).json({message : "ERROR : "+err.message})
    }
})

export default userRouter;