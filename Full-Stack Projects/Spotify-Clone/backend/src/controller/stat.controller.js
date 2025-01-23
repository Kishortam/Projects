
import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";


export const getStats = async(req, res, next) =>{
    try {
        const [totalSongs, totalAlbums, totalUsers, totalArtists] = await Promise.all([
            Song.countDocuments(),
            Album.countDocuments(),
            User.countDocuments(),
            Song.aggregate([  // fetch all the songs
                {$unionWith: {collection: "albums", pipeline: []}},  // fetch all the albums
                {$group: {_id: "$artist"}}, // group the songs by artist
                {$count: "count"} // count the number of artists
            ]),
        ]);

        res.status(200).json({totalSongs, totalAlbums, totalUsers, totalArtists: uniqueArtists[0]?.count || 0});
    } catch (error) {
        next(error);
    }
} 