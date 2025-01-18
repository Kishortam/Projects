import { text } from "express";
import mongoose, { model, trusted } from "mongoose";

// schema for post
const postSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: trusted,
    },
    text:{
        type: String,
    },
    img:{
        type: String
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    comments:[
        {
            text:{
                type: String,
                required: trusted,
            },
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required : true
            }
        }
    ]
}, {timestamps: true});

const Post = mongoose.model("Post", postSchema);

export default Post;