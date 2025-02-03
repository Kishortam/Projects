
export const getUserProfileAndRepo = async (req, res) => {
    const {username}  = req.params;
   try {
     // get user profile
        const userRes = await fetch(`https://api.github.com/users/${username}`, {
            headers: {
                authorization: `token ${process.env.GITHUB_API_KEY}`,
            }
        });

        const userProfile = await userRes.json(); // convert response to json

        // get user repos
        const reposRes = await fetch(userProfile.repos_url, {
            headers: {
                authorization: `token ${process.env.GITHUB_API_KEY}`,
            },
        });
        const repos = await reposRes.json(); // convert response to json

        res.status(200).json({userProfile, repos});
   } catch (error) {
    res.status(500).json({error: error.message});
   } 
} 