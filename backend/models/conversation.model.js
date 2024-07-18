import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({

    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
            // https://dev.to/ifeanyichima/what-is-ref-in-mongoosejs-4o2h
            default: [],
        },
    ],
},{ timestamps: true });
const Conversation=mongoose.model("Conversation",conversationSchema);

export default Conversation