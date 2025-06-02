import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'

import notesRoutes from "./Routes/notesRoutes.js"
import { connectdb } from './config/db.js';
import rateLimiter from './Middleware/rateLimiter.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001

// deployment purpose
const __dirname = path.resolve();

// Basic code or example of using express
// app.get("/api/notes", (req, res)=>{
//     res.send("Server is running and displayed on browser")
// })


// middleware
if(process.env.NODE_ENV === "production"){
    app.use(cors({
        origin:"https://thinkboard-xb6x.onrender.com/",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"]
    })); //this middleware is used to allow cross origin requests
}
app.use(express.json()); //this middleware is used to parse the request body => req.body
app.use(rateLimiter);


// routes middleware      (/api/notes) is prefix
app.use("/api/notes", notesRoutes); 


// deployment code
app.use(express.static(path.join(__dirname, "../frontend/dist"))); //this middleware is used to serve static files
app.get("*", (req, res)=>{res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))}); 



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


