import mongoose from "mongoose"
import 'dotenv/config'

const string = process.env.MONGODB_URI
async function connectDB() {
    await mongoose.connect(string)
}



export default connectDB;


