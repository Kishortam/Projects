import { fetchFromTMDB } from "../SERVICES/tmdb.service.js";

// get random trending TV show
export async function getTrendingTv(req, res) {
    try {
        // trending TV show API
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");

        // select one of the tv show randomly
        const randomTv = data.results[Math.floor(Math.random() * data.results?.length)];

        res.json({success: true, content: randomTv});
    } catch (error) {
        res.status(500).json({success: false, message: "Internal server error"});
    }
}

// get TV trailer
export async function getTvTrailers(req, res) {
    const {id} = req.params;  // trailer id
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
        res.json({success: true, trailers: data.results});
    } catch (error) {
        if(error.message.includes("404")){ // if movie not found
            res.status(404).send(null);  // json({success: false, message: "Movie not found"});
        }
        res.status(500).json({success: false, message: "Internal server error"});
    }
}

// get TV details
export async function getTvDetails(req, res){
    const {id} = req.params; // id of the TV show
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        res.json({success: true, content: data});
    } catch (error) {
        if(error.message.includes("404")){ // if TV not found
            res.status(404).send(null);  // json({success: false, message: "TV not found"});
        }
        res.status(500).json({success: false, message: "Internal server error"});

    }
}

// fetch similar TV show as searched show
export async function getSimilarTvs(req, res) {
    const {id} = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
        res.status(200).json({success: true, similar: data.results});
    } catch (error) {
        res.status(500).json({success: false, message: "Internal server error"});
    }
}

// fetch data by category
export async function getTvsByCategory(req, res) {
    const {category} = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
        res.status(200).json({success: true, content: data.results});
    } catch (error) {
        res.status(500).json({success: false, message: "Internal server error"});
    }
}