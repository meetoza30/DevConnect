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
        default: "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
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
    hackathons :{
        type : 
        [{
        name : String,
        description : String,
        date : Date
    }],
        default : function (){ return [];}
},
projects: {
    type: [
        {
            name: String,
            description: String,
            ghLink: String
        }
    ],
    default: function () { return []; } // Each user gets a new empty array
}
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