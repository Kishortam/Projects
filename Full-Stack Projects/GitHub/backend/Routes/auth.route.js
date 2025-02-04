import express from "express"
import passport from "passport";

const router = express.Router();

router.get("/github", passport.authenticate("github", {scope: ["user:email"]}),);

// login
router.get("/github/callback", passport.authenticate("github", 
    {failureRedirect: process.env.CLIENT_BASE_URL + "/login"}), 
    function(req, res) {
    res.redirect(process.env.CLIENT_BASE_URL);
})

// check if user is authenticated or not
router.get("/check", (req, res) => {
    if(req.isAuthenticated()){
        res.send({user: req.user});
    }
    else{
        res.send({user: null});
    }
});

// logout
router.get("/logout", (req, res) => {
    req.session.destroy((err)=>{
        res.json({message:"Logged out"});
    })
});

export default router;