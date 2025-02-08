import User from "../Models/user.model.js";

// get user profile ans repositories
export const getUserProfileAndRepo = async (req, res) => {
    const {username}  = req.params;
   try {
     // get user profile
        const userRes = await fetch(`https://api.github.com/users/${username}`, {
            headers: {
                authorization: `Token ${process.env.GITHUB_API_KEY}`,
            }
        });

        const userProfile = await userRes.json(); // convert response to json

        // get user repos
        const reposRes = await fetch(userProfile.repos_url, {
            headers: {
                authorization: `Token ${process.env.GITHUB_API_KEY}`,
            },
        });
        const repos = await reposRes.json(); // convert response to json

        res.status(200).json({userProfile, repos});
   } catch (error) {
    res.status(500).json({error: error.message});
   } 
} 

// like a profile
export const likeProfile = async(req, res) =>{
    try {
        const {username} = req.params;
        const user = await User.findById(req.user._id.toString());
        console.log(user, "auth user");
        const userToLike = await User.findOne({username});

        if(!userToLike){
            return res.status(404).json({error:"User is not a member"});
        }
        if(user.likedProfiles.includes(userToLike.username)){
            return res.status(400).json({error: "User already liked"});
        }

        userToLike.likedBy.push({username:user.username, avatarUrl:user.avatarUrl, likedDate:Date.now()});
        user.likedProfiles.push(userToLike.username);

        await Promise.all([userToLike.save(), user.save()]);

        res.status(200).json({message: "User liked successfully"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}


// get likes
export const getLikes = async(req, res) =>{
    try {
        const user = await User.findById(req.user._id.toString());
        res.status(200).json({likedBy: user.likedBy});
    } catch (error) {
        res.status(500).json({error: error.message})
    }
} 
