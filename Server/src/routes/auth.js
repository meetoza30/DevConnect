import express from 'express'
import User from "../models/user.js";
import bcrypt from 'bcrypt';
import validateData from "../utils/validators.js";
import {userAuth} from '../middlewares/auth.js';
import nodemailer from 'nodemailer';
import { resetPasswordAuth } from '../middlewares/auth.js';
import 'dotenv/config'
import app from '../config/firebaseAdmin.js';
import { getAuth } from 'firebase-admin/auth';
import generateUsername from '../utils/utility.js';

const authRouter = express.Router()

authRouter.post('/signup', async (req, res)=>{
    const {fullName, emailId, userName,age, gradYear, projects, gender, password, skills, hackathons, bio, socials} = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({fullName, emailId, userName, age, gradYear, gender, projects : [], hackathons : [], password: hashedPassword, skills, bio, socials});
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
        res.json({user, message : "User saved successfully", token})
        
    }
    catch(err){
        res.status(400).send(err.message);
    }

})

authRouter.post('/login', async (req,res)=>{
    try{
        console.log(req.body.emailId);
        const user = await User.findOne({emailId : req.body.emailId})
    if(!user) throw new Error("Invalid Credentials");
    const isPasswordValid = await bcrypt.compare(req.body.password, user?.password);
    const newhashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(req.body.password, newhashedPassword);

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
        res.json({message : "Login Successfully!!", token})
        }
    }
catch(err){
    res.json({error : err.message})
}
})

authRouter.post('/google/login', async (req, res) => {
  const { gtoken } = req.body;
//   console.log(gtoken)

  try {
    const payload = await getAuth(app).verifyIdToken(gtoken);
    const emailId = payload?.email;
    const fullName = payload?.name;
    const profilePicUrl = payload?.picture;
    const _id = payload.uid;
    const userName = generateUsername(fullName, emailId);

    let existing = false;
    let user = await User.findOne({ emailId });
    if (user) existing = true;

    if (!user) {
      // Generate a strong random password for Google users
      const randomPassword = Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      user = new User({
        fullName,
        emailId,
        userName, 
        password: hashedPassword, 
        profileUrl: profilePicUrl,
        age: "",
        gradYear: "",
        projects: [],
        hackathons: [],
        skills: [],
        gender: "",
        bio: "",
        socials: {},
        isGoogleUser: true
      });

      await user.save();
    }

    const token = await user.getJWToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ user, message: "User logged in successfully", existing, token });
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
});

authRouter.post('/forgotPassword', async(req,res)=>{
    try{
        const {emailId} = req.body;
    console.log(emailId)
    const user = await User.findOne({emailId : req.body.emailId});
    if(!user) {
        console.log("User doesnt exist");
        res.json({message : "User doesnt exist"});
    }

    const token = await user.getJWToken();
    var transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user: process.env.DEVCONNECT_EMAIL,
            pass : process.env.EMAIL_PASS_KEY
        }
    });

    var mailOptions = {
        from : `"Team DevConnect" <process.env.DEVCONNECT_EMAIL>`,
        from : `"Team DevConnect" <process.env.DEVCONNECT_EMAIL>`,
        to : emailId,
        subject : "Reset your password -  DevConnect",
         html: `
    <h2>Hello ${user.fullName},</h2>
    <p>You requested to reset your password.</p>
    <p>Click the link below to reset it:</p>
    <a href="https://dev-connect-opal.vercel.app/#/reset-password/${user._id}/${token}" target="_blank">
      <strong>Reset Password</strong>
    </a>
    <br><br>
    <p>If you did not request this, you can ignore this email.</p>
    <p>– DevConnect</p>
  `
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error) console.log(error)
        else return res.json({message : "Email sent"})
    })
}catch(err){
    res.json({message : "Failure"})
}

})

authRouter.patch('/resetPassword/:token/:id', resetPasswordAuth, async(req,res)=>{
    // console.log("in backend")
    try{const {id, token} = req.params;
    const {password} = req.body;
    // console.log(password)
    const hashedPassword = await bcrypt.hash(password, 10)
    // console.log(hashedPassword)
    const user = await User.findByIdAndUpdate({_id : id}, {password : hashedPassword});
    // console.log(user?.fullName)
    if(!user) res.json({message : "Failure"})
    // console.log("success")
    res.json({message : "Success"});
}
catch(err){
    res.json({message : "Failure"})
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
