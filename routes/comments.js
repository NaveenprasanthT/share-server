const Comments = require("../models/comment.js")
const router = require("express").Router()

//create a comment

router.post("/",async(req,res)=>{
    const newComment = await Comments(req.body)
    try{
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    }catch(err){
        res.status(404).json("Error occured");
    }
})

//get a post command

router.get("/post/:id",async(req,res)=>{
    const currentPost = req.params.id;
    try{
        const comments = await  Comments.find({postId : currentPost});
        return res.status(200).json(comments)
        }catch(err){
            console.log(err)
            return res.status(405).json("Internal Error")
        }
})

module.exports = router;