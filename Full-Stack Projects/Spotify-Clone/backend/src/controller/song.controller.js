import { Song } from "../models/song.model.js";

// to get all songs
export const getAllSongs = async(req, res, next) =>{
    try {
        const songs = await Song.find().sort({createdAt: -1});  //(-1) to sort in descending order
        res.status(200).json(songs);
    } catch (error) {
        next(error);
    }
};


// to get featured songs
export const featuredSongs = async(req, res, next) =>{
    try {
        // fetch 6 random songs using mongoDb aggregate pipeline
        const songs = await Song.aggregate([
            {$sample: {size: 6}},
            {$project: {_id: 1, title: 1, artist: 1, imageUrl: 1, audioUrl: 1}}
        ]);

        res.status(200).json(songs);
    } catch (error) {
        next(error);
    }
};



// to get made for you songs
export const getMadeForYouSongs = async(req, res, next) =>{
    try {
        // fetch 4 random songs using mongoDb aggregate pipeline
        const songs = await Song.aggregate([
            {$sample: {size: 4}},
            {$project: {_id: 1, title: 1, artist: 1, imageUrl: 1, audioUrl: 1}}
        ]);

        res.status(200).json(songs);
    } catch (error) {
        next(error);
    }
};



// to get trending songs
export const getTrendingSongs = async(req, res, next) =>{
    try {
        // fetch 4 random songs using mongoDb aggregate pipeline
        const songs = await Song.aggregate([
            {$sample: {size: 4}},
            {$project: {_id: 1, title: 1, artist: 1, imageUrl: 1, audioUrl: 1}}
        ]);

        res.status(200).json(songs);
    } catch (error) {
        next(error);
    }
};