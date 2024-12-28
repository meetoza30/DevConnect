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

const app = express();
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

app.use(express.json())
app.use(cookieParser())
app.use('/', authRouter)
app.use('/', profileRouter)
app.use('/', connectionRouter)
app.use('/', userRouter)
// app.use('/', authRouter)






