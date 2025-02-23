import express from 'express'
import User from "../models/user.js";
import bcrypt from 'bcrypt';
import validateData from "../utils/validators.js";
import userAuth from '../middlewares/auth.js';


const authRouter = express.Router()

authRouter.post('/signup', async (req, res)=>{
    const {fullName, emailId, userName,age, college, projects, gender, password, skills, hackathons, bio, socials} = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({fullName, emailId, userName, age, college, gender, projects : [], hackathons : [], password: hashedPassword, skills, bio, socials});
    try{
        validateData(req)
        const token = await user.getJWToken();
        await user.save();
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure in production
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            path: "/", // Important! Add path to ensure it's available throughout the site
            maxAge: 24 * 60 * 60 * 1000, // 1 Day
        });
        res.json({user, message : "User saved successfully"})
        
    }
    catch(err){
        res.status(400).send(err.message);
    }

})

authRouter.post('/login', async (req,res)=>{
    try{
        const user = await User.findOne({emailId : req.body.emailId})
    if(!user) throw new Error("Invalid Credentials");
    const isPasswordValid = await bcrypt.compare(req.body.password, user?.password);

    if(!isPasswordValid) throw new Error("Invalid Credentials")
    else if(isPasswordValid){
        const token = await user.getJWToken();
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure in production
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            path: "/", 
            maxAge: 30*24 * 60 * 60 * 1000,
        });
        res.send("Login Successfully!!")
        }
    }
catch(err){
    res.json({error : err.message})
}
})

authRouter.post('/logout',(req,res)=>{
    res.clearCookie("token", { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production", 
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        path: "/" 
    });
    
    
    res.status(200).json({ success: true, message: "Logged out successfully" });
})

authRouter.get('/check-auth', (req,res)=>{
    try{
        const {token} = req.cookies;
        if(!token){
            res.json({message : "Authenticated", status : false})
            return;
        } 
        res.json({message : "Authenticated", status : true})
    }
     catch(err){
        res.json({status : false, message : "Not authenticated"})
     }
})
export default authRouter;