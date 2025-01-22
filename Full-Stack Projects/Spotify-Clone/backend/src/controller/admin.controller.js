import { Album } from "../models/album.model.js";
import {Song} from "../models/song.model.js"
import cloudinary from "../lib/cloudinary.js"

// helper function for cloudinary uploads
const uploadToCloudinary = async(file) =>{
    try {
        // upload the file to cloudinary
        const result = await cloudinary.uploader.upload(file.tempFilePath,{
            resource_type: "auto",
        })
        // get a url of uploaded file
        return result.secure_url
    } catch (error) {
        console.log("Error in uploadToCloudinary", error);
        throw new Error("Error uploading to cloudinary");
    }
}


// create song 
export const createSong = async(req, res, next) =>{
    try {
        // if file is not provided
        if(!req.files || !req.files.audioFile || !req.files.imageFile){
            return res.status(400).json({message: "Please upload all files"});
        }

        const {title, artist, albumId, duration} = req.body;
        const audioFile = req.files.audioFile
        const imageFile = req.files.imageFile

        const audioUrl = await uploadToCloudinary(audioFile);
        const imageUrl = await uploadToCloudinary(imageFile);

        // create a song
        const song = new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            duration,
            albumId : albumId || null
        })

        await song.save(); // save

        // if song belongs to an album, update the album's songs array
        if(albumId){
            await Album.findByIdAndUpdate(albumId, {
                $push: {song: song._id},
            });
        }
        res.status(201).json(song);

    } catch (error) {
        console.log("Error in createSong", error);
        next(error);
    }
}




// delete a song 
export const deleteSong = async(req, res, next) =>{
    try {
        const {id} = req.params

        const song = await Song.findById(id);

        // if song belongs to an album, update the album's songs array
        if(song.albumId){
            await Album.findByIdAndUpdate(albumId, {
                $pull: {song: song._id},
            });
        }

        await Song.findByIdAndDelete(id); // delete song

        res.status(201).json({message: "Song deleted successfully"});

    } catch (error) {
        console.log("Error in deleteSong", error);
        next(error);
    }
}



// create an album
export const createAlbum = async(req, res, next) =>{
    try {
        const {title, artist, releaseYear} = req.body;
        const {imageFile} = req.files

        const imageUrl = await uploadToCloudinary(imageFile);

        // create a album
        const album = new Album({
            title,
            artist,
            imageUrl,
            releaseYear
        })

        await album.save(); // save

        res.status(201).json(album);

    } catch (error) {
        console.log("Error in createAlbum", error);
        next(error);
    }
}


// delete an album
export const deleteAlbum = async(req, res, next) =>{
    try {
        const {id} = req.params;
        await Song.deleteMany({albumId: id});
        await Album.findOneAndDelete(id);

        res.status(200).json({message: "Album deleted successfully"});

    } catch (error) {
        console.log("Error in deleteAlbum", error);
        next(error);
    }
}


// check if is admin
export const checkAdmin = async(req, res, next) =>{
    res.status(200).json({admin: true});
}