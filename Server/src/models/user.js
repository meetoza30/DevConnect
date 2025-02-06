import mongoose, { Schema, model } from "mongoose";
import validate from 'validator'
import jwt from 'jsonwebtoken'

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
        
        validate(value){
            if(value < 16) throw new Error("Minimum age allowed onDevConnect is 16")
        }
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
        default: "https://iconduck.com/icons/6491/profile-default"
    },
    skills: [String],
    bio: {
        type: String,
        max: 200
    },
    socialIds: {
        ig: String,
        github: String,
        X : String,
        linkedin: String
    },
    hackathons : [{
        name : String,
        description : String,
        date : Date
    }],
    projects : [{
        name : String,
        description : String,
        ghLink : String
    }]
},{
    timestamps: true
})

userSchema.methods.getJWToken = async function(){
    const user = this;
    const token = await jwt.sign({_id: user._id}, "DevConnect$3#12", {expiresIn: '576h'})

    return token;
}
const User = model('User', userSchema);

export default User;