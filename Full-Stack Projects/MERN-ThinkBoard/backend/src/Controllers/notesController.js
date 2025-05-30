import Note from "../Models/Note.js";

// function to get all notes
// to check if request is working properly, open postman and send a get request on this route (http://localhost:5001/api/notes)
export const getAllNotes = async(req, res)=>{
    try {
        const notes = await Note.find().sort({createdAt: -1}); // -1 means sort in descending order
        res.status(200).json(notes);
    } catch (error) {
        console.log("Error in getAllNotes controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}


// function to get a note by id
export const getNoteById = async(req, res)=>{
    try {
        const note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json(note);
    } catch (error) {
        console.log("Error in getNoteById controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}


// function to create a note
// to check if request is working properly, open postman and send a post request on this route (http://localhost:5001/api/notes)
export const createNote = async(req, res)=>{
    try {
        const {title, content} = req.body;
        const note = new Note({title, content});
        
        const savedNote = await note.save();
        res.status(201).json({message: "Note created successfully", note: savedNote});
    } catch (error) {
        console.log("Error in createNote controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}


// function to update a note
export const updateNote = async(req, res)=>{
    try {
        const {title, content} = req.body;
        const updateNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new: true});

        if(!updateNote){
            return res.status(404).json({message: "Note not found"});
        }

        res.status(200).json({message: "Note updated successfully", note: updateNote});
    } catch (error) {
        console.log("Error in updateNote controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}


// function to delete a note
export const deleteNote = async(req, res)=>{
    try {
        const deleteNote = await Note.findByIdAndDelete(req.params.id);

        if(!deleteNote){
            return res.status(404).json({message: "Note not found"});
        }

        res.status(200).json({message: "Note deleted successfully"});
    } catch (error) {
        console.log("Error in deleteNote controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}




// check all controllers are working properly or not by sending a get, put, post and delete request on this route (http://localhost:5001/api/notes), if needed id can be added after this route.