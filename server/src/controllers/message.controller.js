import ConversationModel from "../models/conversation.model.js";
import MessageModel from "../models/message.model.js";
import UserModel from "../models/user.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        if(!message || !receiverId) {
            return res.status(400).json({ success: false, error: "All fields are required" });
        }

        const receiverUser = await UserModel.findById(receiverId);

        if(!receiverUser) {
            return res.status(404).json({ success: false, error: "Receiver not found" });
        }

        let conversation = await ConversationModel.findOne({
            participants: {
                $all: [senderId, receiverId]
            }
        });

        if(!conversation) {
            conversation = new ConversationModel({
                participants: [senderId, receiverId]
            });
        }

        const newMessage = new MessageModel({
            senderId,
            receiverId,
            message
        });

        if(newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(200).json({ success: true, message: "Message sent successfully", data: newMessage });

    } catch (error) {
        console.log("Error in sendMessage controller", error);
        const devError = process.env.NODE_ENV !== "development" ? "Internal server error" : error.message;
        res.status(500).json({ success: false, error: devError });
    }
};