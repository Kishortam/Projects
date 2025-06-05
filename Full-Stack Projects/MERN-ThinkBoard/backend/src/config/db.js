import mongoose from "mongoose"

// this function is used to connect to the database
export const connectdb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);  // database connection string
        console.log("MongoDB connected successfully to", conn.connection.host);
    } catch (error) {
        console.log("Error connecting to MongoDB database", error);
        process.exit(1);
    }
}