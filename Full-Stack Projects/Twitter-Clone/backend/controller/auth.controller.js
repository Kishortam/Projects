import { generateTokenAndSetCookie } from "../lib/utils/genarateToken.js";
import User from "../model/user.model.js";
import bcrypt from 'bcryptjs';


//  Signup
export const signup = async(req, res)=>{
    try {
        const {fullName, username, email, password} = req.body; // take all info from req.body

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({error: "Invalid email format"});
        }

        const existingUser = await User.findOne({username});
        if(existingUser){ // if user with same username found
            return res.status(400).json({error: "Username is already taken"})
        }

        const existingEmail = await User.findOne({email})
        if(existingEmail){ // if same email exists
            return res.status(400).json({error: "Email is already taken"});
    }

    if(password.length < 6){
        return res.status(400).json({error: "Password must be atleast 6 characters long"});
    }
    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // if above conditions false, create a new user
    const newUser = new User({
        fullName,
        username,
        email,
        password:hashedPassword,
    })

    // if new user generate token and cookies
    if(newUser){
        generateTokenAndSetCookie(newUser._id, res)
        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            email: newUser.email,
            followers: newUser.followers,
            following: newUser.following,
            profileImg: newUser.profileImg,
            coverImg: newUser.coverImg,
        })
    }
    else{
        res.status(400).json({error: "Invalid user data"});
    }

    } catch (error) {
        console.log("error in signup controller");
        res.status(500).json({error: "Internal server error"});
    }
};


// Login
export const login = async(req, res)=>{
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        // if username or password in incorrect or not mention
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error: "Invalid username or password"});
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            followers: user.followers,
            following: user.following,
            profileImg: user.profileImg,
            coverImg: user.coverImg,
        });

    } catch (error) {
        console.log("error in signup controller", error.message);
        res.status(500).json({error: "Internal server error"});
    }
};



// logout
export const logout = async(req, res)=>{
    try {
        res.cookie("jwt", "", {maxAge: 0})
        res.status(200).json({message: "Logged out successfully"})
    } catch (error) {
        console.log("error in logout controller", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}


export const getMe = async(req, res)=>{
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json(user);
    } catch (error) {
        console.log("error in getMe controller", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}