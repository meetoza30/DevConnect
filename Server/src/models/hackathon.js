import mongoose, { mongo } from "mongoose";

const HackathonSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Owner
    name: { type: String},
    description: { type: String },
    date: { type: Date},
    role: { type: String }, // Role in the hackathon (e.g., "Frontend Dev")
    outcome: { type: String } // Win/Loss, prize, or participation details
  }, { timestamps: true });
  
const Hackathon = mongoose.model('Hackathon', HackathonSchema)
 
export default Hackathon;