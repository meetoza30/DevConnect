import mongoose from "mongoose"

const string = "mongodb+srv://meetoz305:OqBMIsFLrx1044Cf@meetcluster.yqdeb.mongodb.net/DevConnect"
async function connectDB() {
    await mongoose.connect(string)
}



export default connectDB;


