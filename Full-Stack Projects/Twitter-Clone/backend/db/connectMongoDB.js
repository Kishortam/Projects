import mongoose from "mongoose";


// // function for making connection with DB
const connectMongoDB = async() =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(`Error connection to mogoDB : ${error.message}`);
      process.exit(1);
    }
}

export default connectMongoDB;