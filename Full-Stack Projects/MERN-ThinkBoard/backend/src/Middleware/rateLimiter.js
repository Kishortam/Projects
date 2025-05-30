import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        const {success} = await ratelimit.limit("my-limit-key");
        if(!success) {
            return res.status(429).json({message: "Too many requests"});
        }
        next();
    } catch (error) {
        console.log("Error in rateLimiter middleware", error);
        res.status(429).json({message: "Too many requests"});
        next(error);
    }
}

export default rateLimiter

// we can use this middleware to limit the number of requests and prevent DoS attacks
// also we can limit per user or per ip address or per device request