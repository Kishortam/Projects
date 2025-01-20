import mongoose from "mongoose";

// schema for comment
const CommentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    videoId: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
}, {timestamps:true});

export default mongoose.model("Comment", CommentSchema);