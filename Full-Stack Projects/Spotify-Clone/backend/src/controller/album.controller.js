import {Album} from "../models/album.model.js";

// to get all albums
export const getAllAlbums = async(req, res, next) =>{
    try {
        const albums = await Album.find();
        res.status(200).json(albums);
    } catch (error) {
        next(error);
    }
};

export const getAlbumId = async(req, res, next) =>{
    try {
        const {albumId} = req.params;  // get id of album
        // find album by id and populate songs
        const album = await Album.findById(albumId).populate("songs");

        if(!album){  // if album not found
            return res.status(404).json({message: "Album not found"});
        }
        res.status(200).json(album);  // else show album
    } catch (error) {
        next(error);
    }
};