import { User } from "../models/user.model.js";
import {Message} from "../models/messgae.model.js"

// to get all users
export const getAllUsers = async(req, res, next) =>{
    try {
        const currentUserId = req.auth.userId; // current user
        const users = await User.find({clearkId: {$ne: currentUserId}}); // dont show current user
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};



// to get messages
export const getMessages = async(req, res, next) =>{
    try {
        const myId = req.auth.userId;
        const {userId} = req.params; // get id of user

            const messages = await Message.find({
                $or: [
                    {senderId: myId, receiverId: userId},
                    {senderId: userId, receiverId: myId}
                ]
            }).sort({createdAt: 1});

            res.status(200).json(messages);
                } catch (error) {
                    next(error);
                }
}