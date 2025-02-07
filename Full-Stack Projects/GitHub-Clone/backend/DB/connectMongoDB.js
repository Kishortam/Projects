import mongoose from "mongoose";

export default async function connectMongoDB() {
    try {
        // for direct connection from env file
        // await mongoose.connect(process.env.MONGO_URI);
        
        const connectionString = 'mongodb+srv://kishortam:2xeOAP07FG7el6HB@cluster0.3peam.mongodb.net/github_clone_db?retryWrites=true&w=majority&appName=Cluster0';
        await mongoose.connect(connectionString);
        console.log("MongoDB Connected");
    } catch (error) {
        console.log("Error connecting to mongoDB", error.message);
    }
}