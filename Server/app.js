import  express  from "express";
import connectDB from "./src/config/db.js";
import User from "./src/models/user.js";
import authRouter from "./src/routes/auth.js";
import profileRouter from "./src/routes/profile.js";
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";
import {userAuth} from "./src/middlewares/auth.js";
import connectionRouter from "./src/routes/connections.js";
import userRouter from "./src/routes/user.js";
import messageRouter from "./src/routes/message.js";
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
const allowedOrigins = [
    'http://localhost:5173', // Local development
    'https://dev-connect-opal.vercel.app' // Deployed frontend
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  }));
app.use(express.json())
app.use(cookieParser())
app.use('/', authRouter)
app.use('/', profileRouter)
app.use('/', connectionRouter)
app.use('/', userRouter)
app.use('/', messageRouter)






