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
    }).populate("senderId", "firstName lastName")
    if(!reqs) throw new Error("No reqs available")

    res.json({
        message : "Here are the reqs",
        data : reqs
    })
}
catch(err){
    res.status(400).json({
        message : "ERROR : "+ err.message
    })
}
})

userRouter.get('/user/connecs',userAuth, async (req, res)=>{
   try {const user = req.user;
    const connecs = await Req.find({
        $or : [
            {senderId : user._id, status : "accepted"},
        {receiverId : user._id, status: "accepted"}
    ] 
    })
if(!connecs) throw new Error("No connecs available");
res.json({
    message : "Here are the connecs",
    data : connecs
})
}
catch(err){
    res.status(404).json({
        message : "ERROR : "+ err.message
    })
}

})

userRouter.get('/feed', userAuth, async (req, res)=>{
    const SAFE_DATA = "firstName lastName userName "
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
      const feedData = await User.find({
            _id : { $nin : Array.from(hideFromFeed)}
        }).select(SAFE_DATA)
      
        res.send(feedData)
    }
    catch(err){
        res.json({error : err.message})
    }
})

export default userRouter;