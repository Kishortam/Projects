import express from 'express'

const app = express();

app.get("/api/notes", (req, res)=>{
    res.send("Server is running and displayed on browser")
})

app.listen(5001, ()=>{
    console.log("Sever started on port 5001")
})