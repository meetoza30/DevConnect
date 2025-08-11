import  express  from "express";
import connectDB from "./src/config/db.js";
import authRouter from "./src/routes/auth.js";
import profileRouter from "./src/routes/profile.js";
import cookieParser from "cookie-parser";
import connectionRouter from "./src/routes/connections.js";
import userRouter from "./src/routes/user.js";
import messageRouter from "./src/routes/message.js";
import {createServer} from 'http';
import cors from "cors"
import initializeSocket from "./src/utils/sockets.js";

const app = express();
const server = createServer(app);

initializeSocket(server);
connectDB()

.then(()=>{
    console.log("Connected to DB")
    server.listen(4000, ()=>{
        console.log("Server is listening on port 4000")
    })
}
)
.catch((err)=>{
    console.error("DB connection isnt established")
})

// const allowedOrigins = [
//     'http://localhost:5173', 
//     'https://dev-connect-opal.vercel.app', 
//     'http://3.110.158.200' 
//   ];
  

// app.use(cors({
//     origin: (origin, callback)=>{
//         callback(null, origin);
//         credentials:true;
//     }
// }))


const allowedOrigins = [
    'http://localhost:5173',      
    'https://dev-connect-opal.vercel.app',
];

app.use(cors({
    origin: function (origin, callback) {
        
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json())
app.use(cookieParser())
app.use('/', authRouter)
app.use('/', profileRouter)
app.use('/', connectionRouter)
app.use('/', userRouter)
app.use('/', messageRouter)






