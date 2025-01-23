import { User } from "../models/user.model.js";

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