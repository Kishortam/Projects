import { clerkClient } from "@clerk/express";

// check if user is authenticated or not
export const protectRoute = async(req, res, next) =>{
    if(!req.auth.userId){
        return res.status(401).json({message: "Unauthorized - You must be logged in"});
        
    }
    next();
};


// check if user is admin or not
export const requireAdmin = async(req, res, next) =>{
    try {
        const currentUser = await clerkClient.users.getUser(req.auth.userId);
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

        if(!isAdmin){
            return res.status(403).json({message: "Unauthorized - you must be an admin"});
        }

        next();
    } catch (error) {
        next(error)
    }
}
