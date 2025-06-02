import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import notesRoutes from "./Routes/notesRoutes.js"
import { connectdb } from './config/db.js';
import rateLimiter from './Middleware/rateLimiter.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001

// Basic code or example of using express
// app.get("/api/notes", (req, res)=>{
//     res.send("Server is running and displayed on browser")
// })


// middleware
app.use(cors({origin: "http://localhost:5173"}));  //this middleware is used to allow cross origin requests
app.use(express.json()); //this middleware is used to parse the request body => req.body
app.use(rateLimiter);


// routes middleware      (/api/notes) is prefix
app.use("/api/notes", notesRoutes);  



// production ready code, where database is connected fisrt and then server is started
connectdb().then(()=>{
    app.listen(PORT, ()=>{
        console.log("Server started on port", PORT);
    })
})


// Basic code of listening the server
// app.listen(PORT, ()=>{
//     console.log("Sever started on port", PORT);
//     connectdb();
// })


