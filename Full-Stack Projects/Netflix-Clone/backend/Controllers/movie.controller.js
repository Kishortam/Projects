import { fetchFromTMDB } from "../SERVICES/tmdb.service.js";

// get random trending movie
export async function getTrendingMovie(req, res) {
    try {
        // trending movie API
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");

        // select one of the movie randomly
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];

        res.json({success: true, content: randomMovie});
    } catch (error) {
        res.status(500).json({success: false, message: "Internal server error"});
    }
}

// get movie trailer
export async function getMovieTrailers(req, res) {
    const {id} = req.params;  // trailer id
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
        res.json({success: true, trailers: data.results});
    } catch (error) {
        if(error.message.includes("404")){ // if movie not found
            res.status(404).send(null);  // json({success: false, message: "Movie not found"});
        }
        res.status(500).json({success: false, message: "Internal server error"});
    }
}

// get movie details
export async function getMovieDetails(req, res){
    const {id} = req.params; // id of the movie
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        res.json({success: true, content: data});
    } catch (error) {
        if(error.message.includes("404")){ // if movie not found
            res.status(404).send(null);  // json({success: false, message: "Movie not found"});
        }
        res.status(500).json({success: false, message: "Internal server error"});

    }
}

// fetch similar movies as searched movie
export async function getSimilarMovies(req, res) {
    const {id} = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
        res.status(200).json({success: true, similar: data.results});
    } catch (error) {
        res.status(500).json({success: false, message: "Internal server error"});
    }
}

// fetch data by category
export async function getMoviesByCategory(req, res) {
    const {category} = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
        res.status(200).json({success: true, content: data.results});
    } catch (error) {
        res.status(500).json({success: false, message: "Internal server error"});
    }
}