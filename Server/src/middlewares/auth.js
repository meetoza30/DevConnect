import jwt from 'jsonwebtoken'
import User from '../models/user.js';
import 'dotenv/config'

const userAuth = async (req, res, next)=>{
   try {
    const {token} = req.cookies;
    if(!token) throw new Error("Invalid entry, please login again")
    const decodedId = await jwt.verify(token, process.env.DEVCONNECT_TOKEN_KEY )
   
    
    const {_id} = decodedId;
    
    const user = await User.findById(_id);
    if(!user) throw new Error("User doesnt exist")
    req.user = user;
    next();
}
    catch(err){
        res.status(400).send(err.message);
    }
}

export default userAuth;