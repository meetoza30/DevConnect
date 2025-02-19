import express from 'express'
import User from "../models/user.js";
import bcrypt from 'bcrypt';
import validateData from "../utils/validators.js";


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
            httpOnly: true, // Prevent JavaScript access
            secure: false, // Works only on HTTPS in production
            sameSite: "Lax", // Controls cross-site behavior
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
            httpOnly: true, // Prevent JavaScript access
            secure: false, // Works only on HTTPS in production
            sameSite: "Lax", // Controls cross-site behavior
            maxAge: 24 * 60 * 60 * 1000, // 1 Day
        });
        res.send("Login Successfully!!")
        }
    }
catch(err){
    res.send(err.message)
}
})

authRouter.post('/logout',(req,res)=>{
    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "strict" });
    res.cookie('token', null);
    res.send("User logged out!!")
})

export default authRouter;