import User from "../models/user.model.js";

export const getUserForSidebar=async(req,res)=>{
    try{
        const logedInUserId=req.user._id;
        // find every user in the database but not equal to the logedinuserid
        const filteredUsers = await User.find({_id:{$ne:logedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);
    }
    catch(error){
        console.log("Error in getUserForSidebar function",error.message);
        res.status(500).json({error: "internal server error"});
    }
}