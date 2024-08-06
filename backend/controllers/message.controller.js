import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";


export const sendMessage = async (req, res) => {
  // console.log("message sent", req.params.id);
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    })

    if (newMessage) {
      // we are pushing the id of the conversation between them
      conversation.messages.push(newMessage._id);
    }

    // await conversation.save();
    // await newMessage.save();->>
    // sequential save it will take lots of time 

    // this willrun paralely
    await Promise.all([conversation.save(), newMessage.save()]);
    // above is bettr the first it will work simultaniously take less time do paralle execution


    const receiverSocketId=getReceiverSocketId(receiverId);
    if(receiverSocketId){
      // i only want to send to the specified receiver
      io.to(receiverSocketId).emit("newMessage",newMessage);
    }
   res.status(201).json({newMessage} );

  } catch (error) {
    console.log("Error in send Message Controller", error.message);
    res.status(500).json({ error: "Inrernal Server Error" });
  }
};

export const getMessages = async (req, res) => {

  try {

    const { id: userToChatID } = req.params;
    const senderId = req.user._id;// coming from the protech route

    const conversation = await Conversation.findOne({
      participants:{$all:[senderId,userToChatID]},

    }).populate("messages");

    if(!conversation) return res.status(200).json([]);
    const messages=conversation.messages;
    res.status(200).json(messages);
  }
  catch (error) {
    console.log("Error in get Message Controller", error.message);
    res.status(500).json({ error: "Inrernal Server Error" });
  }

}