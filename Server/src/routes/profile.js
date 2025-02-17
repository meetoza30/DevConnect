import express from 'express'
import User from "../models/user.js";
import userAuth from '../middlewares/auth.js';
import validateData from '../utils/validators.js';
import bcrypt from 'bcrypt'
import Project from '../models/project.js';
import Hackathon from '../models/hackathon.js';
import upload from '../utils/multer.js';

const profileRouter = express.Router();


profileRouter.patch('/profile/edit',userAuth, async (req, res)=>{
    try{
        if(req.body.skills?.length >15) throw new Error("You can add only 15 skills")
        else if(req.body.skills?.length < 3) throw new Error("You should add minimum 3 skills");

        console.log(req.body.skills)
        const user = req.user;
        const updatedUser = await User.findByIdAndUpdate(user._id, req.body, {runValidators:true, new : true})
        console.log(updatedUser)
        res.json(updatedUser);

    }
    catch(err){
res.send("ERROR : " + err.message)
    }
})

profileRouter.patch('/profile/upload', userAuth,upload.single('profilePic'), async(req,res)=>{
    try {

        if(!req.file) throw new Error("Please upload a file")
            // console.log("Uploaded file details:", req.file);

            let user = req.user;
            console.log("before change : ",user.profileUrl)
            // user.profileUrl = req.file.path;
            // await user.save()
            const updatesUser = await User.findByIdAndUpdate(user._id, {profileUrl : req.file.path})
            console.log("after change", updatesUser.profileUrl)
            // console.log("after change : ",user.profileUrl)

        res.json({message : "Profile picture uploaded successfully", profileUrl : user.profileUrl})
    } catch (error) {
        res.status(400).json({error : error.message})
    }
})
profileRouter.get('/profile/view', userAuth, async (req, res)=>{
    try{
        const user = await User.findById(req.user._id)
        .populate("hackathons")
        .populate("projects");
        res.send(user);
    }
    catch(err){
        res.send(err);
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

profileRouter.patch('/hackathon-edit/:hackathonId', userAuth, async(req, res)=>{
    try {
        const {hackathonId} = req.params;
        const updates = req.body;
        console.log(updates)
        const updatedHackathon = await Hackathon.findByIdAndUpdate({_id : hackathonId, userId : req.user._id},updates ,{new : true});

        if(!updatedHackathon) return res.json({error : "Hackathon not found"});

        res.json(updatedHackathon)
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
})

profileRouter.post('/profile/add/hackathon', userAuth, async(req,res)=>{
    try {
        const { name, description, date, role, outcome} = req.body.hackathon;
        const newHackathon = await Hackathon.create({userId : req.user._id, name, description, date, role, outcome});
        await User.findByIdAndUpdate(req.user._id, {$push : {hackathons : newHackathon._id}})

        res.json(newHackathon)
    } catch (error) {
        res.json(error);
    }
})

profileRouter.post('/profile/add/project', userAuth, async(req,res)=>{
    try {
        const { title, description, url, techStack, startDate, endDate } = req.body;
        const newProject = await Project.create({ userId: req.user._id, title, description, url, techStack, startDate, endDate });
    
        await User.findByIdAndUpdate(req.user._id, { $push: { projects: newProject._id } });
    
        res.json(newProject);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
})

profileRouter.patch('/project-edit/:projectId', userAuth, async(req,res)=>{
    try {
        const  projectId  = req.params.projectId;
        const updates = req.body;
        console.log(projectId)
        const updatedProject = await Project.findOneAndUpdate(
          { _id: projectId, userId: req.user._id },
          updates,
          { new: true } // Return updated project
        );
    
        if (!updatedProject) return res.status(404).json({ error: "Project not found" });
    
        res.json(updatedProject);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
})

profileRouter.delete('/remove-project/:projectId',userAuth, async(req,res)=>{
    const {projectId} = req.params;
    console.log(projectId)
    try{
        await Project.findByIdAndDelete(projectId)
    await User.updateOne(
        {_id : req.user._id},
        {$pull : {projects : projectId}}
    )

    res.status(200).json({message : "Project deleted successfully"})
}
    catch(err){
        res.status(500).json({message : "AN ERROR OCCURED"})
    }

    
})

profileRouter.delete('/remove-hackathon/:hackathonId',userAuth, async(req,res)=>{
    const {hackathonId} = req.params;
   
    try{
        await Hackathon.findByIdAndDelete(hackathonId)
    await User.updateOne(
        {_id : req.user._id},
        {$pull : {hackathons : hackathonId}}
    )

    res.status(200).json({message : "Hackathon deleted successfully"})
}
    catch(err){
        res.status(500).json({message : "AN ERROR OCCURED"})
    }

    
})

export default profileRouter