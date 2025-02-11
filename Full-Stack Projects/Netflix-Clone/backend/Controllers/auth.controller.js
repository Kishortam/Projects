import User from "../Models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../UTILS/generateToken.js";

export const signup = async(req, res) => {
    try {
        const {email, password, username} = req.body;
        
        // if not any of above is present
        if(!email || !password || !username) {
            return res.status(400).json({success: false, message: "All fields are required"});
        }

        // if email is not valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            return res.status(400).json({success: false, message: "Invalid email"});
        }

        // if password length is less than 6
        if(password.length < 6) {
            return res.status(400).json({success: false, message: "Password must be at least 6 characters"});
        }

        // if email is already registered
        const emailExists = await User.findOne({email});
        if(emailExists) {
            return res.status(400).json({success: false, message: "Email already exists"});
        }

        // if username is already registered
        const userExists = await User.findOne({username});
        if(userExists) {
            return res.status(400).json({success: false, message: "User already exists"});
        }


        // hashing a password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png" ];
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        // create a new user
        const newUser = new User({
            email,
            password : hashedPassword, // so the password will be hashed
            username,
            image
        });

        generateTokenAndSetCookie(newUser._id, res);
        // save user to database
        await newUser.save();

        // remove password from response
        res.status(201).json({success: true, user:{
          ...newUser._doc,
          password: ""
        }});
        
    } catch (error) {
        console.log("Error in signup: " + error.message);
        res.status(500).json({success: false, message: "Internal server error"});
    }
}



export const login = async(req, res) => {
    res.send("login");
}

export const logout = async(req, res) => {
    res.send("logout");
}