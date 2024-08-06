import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"


import connectToMongoDB from "./db/connectToMongoDB.js";
import {app,server} from "./socket/socket.js";
// const app=express();

const PORT=process.env.PORT||5000;

dotenv.config();

// new
const __dirname = path.resolve();
// to get the data from the req.body
app.use(express.json());//to parse the incoming requests with json payload
app.use(cookieParser());

app.use('/api/auth',authRoutes);
app.use('/api/messages',messageRoutes);
app.use('/api/users',userRoutes);

// new
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// new
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});


//old
// app.get('/',(req, res) => {
//     res.send("Hello world");
// })

server.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`server running on port ${PORT}`);
})

// FE_ npm run dev
// BE npm run server in main chat app
