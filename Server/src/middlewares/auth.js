import jwt from 'jsonwebtoken'
import User from '../models/user.js';

const userAuth = async (req, res, next)=>{
   try {const {token} = req.cookies;
    if(!token) throw new Error("Invalid entry, please login again")
    const decodedId = await jwt.verify(token, "DevConnect$3#12")

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