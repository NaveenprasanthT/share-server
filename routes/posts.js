const router = require("express").Router();
const Post = require("../models/Post");
const People = require("../models/People");

//create a post

router.post("/", async (req,res)=>{
   const newPost = await Post(req.body);
   try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
   }catch(err){
    res.status(401).json(err)
   } 
});

//update a post

router.put("/:id", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(req.body.userId === post.userId){
            await post.updateOne({$set:req.body});
            res.status(200).json("Your Post has been Updated Successfully");
        }else{
            res.status(402).json("You can only update Your Post");
        }
    }catch(err){
        res.status(401).json(err)
    }
});

//delete a post

router.delete("/:id", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(req.body.userId === post.userId){
            await post.deleteOne();
            res.status(200).json("Your Post has been Delete");
        }else{
            res.status(402).json("You can only Delete Your Post");
        }
    }catch(err){
        res.status(401).json(err)
    }
});

//like a post

router.put("/:id/like",async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push: {likes:req.body.userId}});
            res.status(200).json("You liked this Post");
        }else{
            await post.updateOne({$pull: {likes:req.body.userId}});
            res.status(200).json("You disliked this Post");
        }
    }catch(err){
        res.status(402).json(err);
    }
});

//get a post

router.get("/:id", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
});

//get users timeline

router.get("/timeline/:userId", async (req,res)=>{
    try{
        const currentUser = await People.findById(req.params.userId);
        const userPosts = await Post.find({userId: currentUser._id});
        const friendPosts = await Promise.all(
            currentUser.following.map((friendId)=>{
               return Post.find({ userId: friendId});
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts))
    }catch(err){
        res.status(500).json(err);
    }
});

//all post

router.get("/line", async (req,res)=>{
    try{
        const userPosts = await Post.find({});
        res.status(200).json(userPosts)
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;