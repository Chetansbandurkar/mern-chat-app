import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';


const protectRoute=async(req,res,next)=>{
    try{
        const token =req.cookies.jwt;
        if(!token ){
            return res.status(401).json({eror:"unauthorise no token is provided"});
        }

        const decoded =jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({error:"Unauthorised - invalid Token "});

        }

        const user=await User.findById(decoded.userId).select("-password");// return all  and not a <<password 

        if(!user){
           return  res.status(404).json({error:"User Not Found"});
        }
    
        req.user=user
        next();

    }
    catch(error){
      console.log("error in protect middlewear router",error.message);
      res.status(500).json({error:"INternal Server error"})
    }
}

export default protectRoute;