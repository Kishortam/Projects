import express from "express"
import { createNote, deleteNote, getAllNotes, getNoteById, updateNote } from "../Controllers/notesController.js"

const router = express.Router()

router.get("/", getAllNotes)      // to get all notes
router.get("/:id", getNoteById)   // to get a note by id
router.post("/", createNote)      // to create a note
router.put("/:id", updateNote)    // to update a note
router.delete("/:id", deleteNote) // to delete a note


export default router