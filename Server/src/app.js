import  express  from "express";
import connectDB from "./config/db.js";
import User from "./models/user.js";
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";
import userAuth from "./middlewares/auth.js";
import connectionRouter from "./routes/connections.js";
import userRouter from "./routes/user.js";
import messageRouter from "./routes/message.js";
import {createServer} from 'http';
import cors from "cors"
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors:{
        origin : "http://localhost:5173", 
        methods: ["GET", "POST"]
    }
})
connectDB()
.then(()=>{
    console.log("Connected to DB")
    app.listen(4000, ()=>{
        console.log("Server is listening on port 4000")
    })
}
)
.catch((err)=>{
    console.error("DB connection isnt established")
})
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())
app.use('/', authRouter)
app.use('/', profileRouter)
app.use('/', connectionRouter)
app.use('/', userRouter)
app.use('/', messageRouter)






