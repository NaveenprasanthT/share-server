const router = require("express").Router();
const Post = require("../models/Post");
const People = require("../models/People");


//get users profile

router.get("/:username", async (req,res)=>{
    try{
        const user = await People.findOne({username: req.params.username});
        const posts = await Post.find({userId: user._id});
        res.status(200).json(posts)
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports=router