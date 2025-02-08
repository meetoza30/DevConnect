import express from 'express'
import User from "../models/user.js";
import userAuth from '../middlewares/auth.js';
import validateData from '../utils/validators.js';
import bcrypt from 'bcrypt'

const profileRouter = express.Router();


profileRouter.patch('/profile/edit',userAuth, async (req, res)=>{
    try{
        if(req.body.skills?.length >15) throw new Error("You can add only 15 skills")
        else if(req.body.skills?.length < 3) throw new Error("You should add minimum 3 skills");


        const allowedUpdates = ["fullName", "userName","gender", "projects", "hackathons","profileUrl","skills", "age", "college", "bio"];
        const isAllowedUpdates = Object.keys(req.body).every((k)=>allowedUpdates.includes(k))
        if(!isAllowedUpdates) throw new Error("Updating isnt allowed")
        validateData(req)
        const user = req.user;
        const updatedUser = await User.findByIdAndUpdate(user._id, req.body, {runValidators:true})
         res.json(updatedUser);
    }
    catch(err){
res.send("ERROR : " + err.message)
    }
})

profileRouter.get('/profile/view', userAuth,(req, res)=>{
    try{
        const user = req.user;
        res.send(user);
    }
    catch(err){
        res.send("an error occured");
    }
})

profileRouter.patch('/profile/edit/password', userAuth, async (req, res)=>{
    try{ 
        const user = req.user;
        
        console.log(req.body.password)
        const hashedNewPassword = await bcrypt.hash(req.body.password, 10);
        await User.findByIdAndUpdate(user._id, {password : hashedNewPassword})
    
        res.send("Password updated successfully")}
        catch(err){
            res.status(400).send(err.message)
        }
   
})

export default profileRouter