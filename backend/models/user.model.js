import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    fullName:{
        type:"string",
        required: true,
    },
    username:{
        type:"string",
        required: true,
        unique:true,
    },
    password:{
        type:"string",
        required:true,
        minLength:6,
    },
    gender:{
        type:"string",
        required:true,
        // set of allow value in the field
        enum:["male","female"]
    },
    profilePic:{
        type:"string",
        default:""
    },
},{timestamps:true});

const User=mongoose.model("User",userSchema);

export default User;