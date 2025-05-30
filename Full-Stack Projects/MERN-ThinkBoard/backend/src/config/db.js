import mongoose from "mongoose"

export const connectdb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);  // mongodb+srv://kishortam:GWb2pE9uc3WZVaVc@cluster0.kt3jj4j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
        console.log("MongoDB connected successfully to", conn.connection.host);
    } catch (error) {
        console.log("Error connecting to MongoDB database", error);
        process.exit(1);
    }
}