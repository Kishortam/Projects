import express from 'express'
import dotenv from 'dotenv'

import notesRoutes from "./Routes/notesRoutes.js"
import { connectdb } from './config/db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001

// Basic code or example of using express
// app.get("/api/notes", (req, res)=>{
//     res.send("Server is running and displayed on browser")
// })


// middleware
app.use(express.json());

// routes middleware      (/api/notes) is prefix
app.use("/api/notes", notesRoutes);  


app.listen(PORT, ()=>{
    console.log("Sever started on port", PORT);
    connectdb();
})


// mongoDB connection string
// mongodb+srv://kishortam:GWb2pE9uc3WZVaVc@cluster0.kt3jj4j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0