import mongoose from "mongoose";

export default async function connectMongoDB() {
    try {
        const connectionString = 'mongodb+srv://kishortam:MAq5NSigxo88EShg@cluster0.lhoo4.mongodb.net/github-db?retryWrites=true&w=majority&appName=Cluster0';
        await mongoose.connect(connectionString);
        console.log("MongoDB Connected");
    } catch (error) {
        console.log("Error connecting to mongoDB", error.message);
    }
}