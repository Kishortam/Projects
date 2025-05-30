import express from 'express'

import notesRoutes from "./Routes/notesRoutes.js"

const app = express();

// Basic code or example of using express
// app.get("/api/notes", (req, res)=>{
//     res.send("Server is running and displayed on browser")
// })


// routes middleware      (/api/notes) is prefix
app.use("/api/notes", notesRoutes);  


app.listen(5001, ()=>{
    console.log("Sever started on port 5001")
})