import mongoose, { mongo } from "mongoose";

const reqSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    receiverId : {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref : "User"
    },
    status:{
        type: String,
        required: true,
        enum: {
            values : ["accepted", "ignore", "interested", "rejected"],
            message : '{VALUE} is incorrect status type'
        }
    }
},
{timestamps : true})

reqSchema.index({senderId : 1, receiverId : 1})
const Req = new mongoose.model("Req", reqSchema);

export default Req;