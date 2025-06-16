import mongoose, { Schema, model } from "mongoose";
import validate from 'validator'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const userSchema = new Schema({
    fullName : {
        type:String,
        required : true
    },
    userName: {
        type: String,
        unique: true
    },
    age : {
        type: Number,
    },
    emailId: {
        type:String,
        required: true,
        trim:true,
        unique:true,
        lowerCase: true
    },
    college: {
        type:String,
    // required:true
},
    password: {
        type:String,
    required: true
}, 
    gender: {type: String,
        // required: true
    },
    profileUrl: {
        type: String,
        default : "https://res.cloudinary.com/dlsgdlo8u/image/upload/v1740492336/defProfile_wrxisv.jpg"
        
    },
    skills: [String],
    bio: {
        type: String,
        max: 200
    },
    isGoogleUser: { type: Boolean, default: false },
    socialIds: {type: Object},
    hackathons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hackathon" }],
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }]
},{
    timestamps: true
})

userSchema.methods.getJWToken = async function(){
    const user = this;
    const token = await jwt.sign({_id: user._id}, process.env.DEVCONNECT_TOKEN_KEY, {expiresIn: '576h'})
    
    return token;
}
const User = model('User', userSchema);

export default User;