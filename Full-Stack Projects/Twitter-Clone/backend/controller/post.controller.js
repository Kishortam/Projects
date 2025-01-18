import { text } from "express";
import Post from "../model/post.model.js";
import User from "../model/user.model.js";
import {v2 as cloudinary} from "cloudinary";
import Notification from "../model/notification.model.js"


// create post
export const createPost = async(req, res) => {
    try {
        const {text} = req.body;
        let {img} = req.body;

        const userId = req.user._id.toString();

        const user = await User.findById(userId); // find user by id
        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        if(!text && !img){
            return res.status(400).json({error : "Post must have text or image"})
        }

        if(img){
            const uploadedResponse = await cloudinary.uploader.upload(img);
            img = uploadedResponse.secure_url;
        }

        // create a new post
        const newPost = new Post({
            user:userId, 
            text,
            img,
        })

        await newPost.save();  // save the post

        res.status(201).json(newPost);

    } catch (error) {
        res.status(500).json({error: "Internal server error"});
        console.log("Error in createPost controller:", error);
    }
}


// delete post
export const deletePost = async(req, res) =>{
    try {
        // find post by id
        const post = await Post.findById(req.params.id);
        // if post not found with given id
        if(!post){  
            return res.status(404).json({error: "Post not found"});
        }
        // if user with same id is not found, then post cannot be deleted
        if(post.user.toString() !== req.user._id.toString()){
            return res.status(401).json({error: "You are not authorize to delete this post"});
        }
        // if post with image, destroy or delete the image also
        if(post.img){
            const imgId = post.img.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(imgId);
        }

        // delete a post
        await Post.findByIdAndDelete(req.params.id);
        // message
        res.status(200).json({message : "Post deleted successfully"});
    } catch (error) {
        console.log("Error in deletePost controller: ", error);
        res.status(500).json({error: "Internal server error"});
    }
}

// comment on a post
export const commentOnPost = async(req, res) =>{
    try {
        const {text} = req.body;
        const postId = req.params.id;
        const userId = req.user._id;

        // if text of comment is not available
        if(!text){
            return res.status(400).json({error : "Text field is required"});
        }
        // find post by id
        const post = await Post.findById(postId);  
        // if post not found to comment on it
        if(!post){
            return res.status(404).json({error: "post not found"});
        }

        // comment
        const comment = {user : userId, text}
        // push comment to post
        post.comments.push(comment);
        await post.save();

        res.status(200).json(post);

    } catch (error) {
        console.log("Error in commentPost controller: ", error);
        res.status(500).json({error : "Internal server error"});
    }
}

// like and unlike
export const likeUnlikePost = async(req, res) =>{
    try {

        const userId = req.user._id;
    const {id:postId} = req.params;

    // find a post
    const post = await Post.findById(postId);
    // if post not found
    if(!post){
        return res.status(404).json({error: "Post not found"});
    }
    // check if user has already liked a post
    const userLikedPost = post.likes.includes(userId); // check if user is there in like column
    // if user already liked post, unlike it
    if(userLikedPost){
        // unlike post
        await Post.updateOne({_id:postId}, {$pull: {likes: userId}});
        await User.updateOne({_id:userId}, {$pull: {likedPosts: postId}});

        const updatedLikes = post.likes.filter((id) => id.toString() !== userId.toString());
        res.status(200).json(updatedLikes);
    }
    else{
        // like post
        post.likes.push(userId);
        await User.updateOne({_id:userId}, {$push: {likedPosts: postId}});
        await post.save();
        // send notification 
        const notification = new Notification({
            from: userId,
            to: post.user,
            type : "like"
        })
        await notification.save();

        const updatedLikes = post.likes;
        res.status(200).json(updatedLikes);
    }
    } catch (error) {
        console.log("Error in likeUnlikePost controller: ", error);
        res.status(500).json({error: "Internal server error"});
    }
}

// get all post
export const getAllPosts = async(req, res) =>{
try {
    // get latest post 1st, by populating, dont show password
    const posts = await Post.find().sort({createdAt: -1})
    .populate({
        path:"user",
        select: "-password",
    })
    .populate({
        path:"comments.user",
        select: "-password",
    });
    // if post is not there, return empty array
    if(posts.length === 0){
        return res.status(200).json([]);
    }
    // return posts
    res.status(200).json(posts);

} catch (error) {
    console.log("Error in getAllPosts controller: ", error);
    res.status(500).json({error: "Internal server error"});
}
}


// get liked posts
export const getLikedPosts = async(req, res) =>{
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({error: "User not found"});
        }

        const likedPosts = await Post.find({_id : {$in: user.likedPosts}})
        .populate({
            path: "user",
            select: "-password",
        })
        .populate({
            path: "comments.user",
            select: "-password",
        });

        res.status(200).json(likedPosts);

    } catch (error) {
        console.log("Error in getLikedPosts controller: ", error);
        res.status(500).json({error: "Internal server error"});
    }
}


// get followings posts
export const getFollowingPosts = async(req, res)=>{
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        // if user not found
        if(!user){
            return res.status(404).json({error: "User not found"})
        }
        // following users
        const following = user.following;
        // show feed of following users
        const feedPosts = await Post.find({user: {$in: following}})
        .sort({createdAt: -1})
        .populate({
            path: "user",
            select: "-password",
        })
        .populate({
            path: "comments.user",
            select: "-password",
        });

        res.status(200).json(feedPosts);
    } catch (error) {
        console.log("Error in getFollowingPosts controller: ", error);
        res.status(500).json({error: "Internal server error"});
    }
}


// get userpost by username
export const getUserPosts = async(req, res)=>{
    try {
        const {username} = req.params;
       
        const user = await User.findOne({username});
        // if user not found
        if(!user){
            return res.status(404).json({error: "User not found"})
        }
        
        const posts = await Post.find({user:user._id})
        .sort({createdAt: -1})
        .populate({
            path: "user",
            select: "-password",
        })
        .populate({
            path: "comments.user",
            select: "-password",
        });

        res.status(200).json(posts);
    } catch (error) {
        console.log("Error in getUserPosts controller: ", error);
        res.status(500).json({error: "Internal server error"});
    }
}