const People = require("../models/People");
const router = require("express").Router();
const bcryptjs = require("bcryptjs");

//update user
router.put("/:id", async (req,res)=>{
    console.log(req.params.id)
    console.log(req.body.userId)
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcryptjs.genSalt(10);
                req.body.password = await bcryptjs.hash(req.body.password, salt);
            }catch(err){
                return res.status(501).json(err);
            }
        }
        try{
            const user = await People.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            });
            res.status(200).json("Account Updted Sucessfully")
        }catch(err){
            return res.status(502).json(err);
        }
    }else{
        return res.status(500).json("You can update your account only")
    }
});

//delete
router.delete("/:id", async (req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try{
            await People.findByIdAndDelete(req.params.id);
            res.status(200).json("Account deleted Sucessfully")
        }catch(err){
            return res.status(502).json(err);
        }
    }else{
        return res.status(500).json("You can delete your account only")
    }
});

//get a user
router.get("/", async (req,res)=>{
    const userId = req.query.userId;
    const username = req.query.username;
    try{
        const user =userId 
        ? await People.findById(userId)
        : await People.findOne({username: username});
        const {password,updatedAt, ...other} = user._doc; 
        res.status(200).json(other);
    }catch(err){
        res.status(505).json(err)
    }
});

//follow user
router.put("/:id/follow",async(req,res)=>{
    if(req.params.id === req.body.userId){
        res.status(402).json("You can't follow Yourself...");
    }else{
        try{
            const user = await People.findById(req.params.id);
            const currentUser = await People.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne( {$push: {followers: req.body.userId}});
                await currentUser.updateOne( {$push: {following: req.params.id}});
                res.status(200).json("You are now followers");
            }else{
                res.status(403).json("You are already followers");
            }
        }catch(err){
            res.status(404).json(err)
        }
    }
});

//unfollow
router.put("/:id/unfollow",async(req,res)=>{
    if(req.params.id === req.body.userId){
        res.status(402).json("You can't unfollow Yourself...");
    }else{
        try{
            const user = await People.findById(req.params.id);
            const currentUser = await People.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne( {$pull: {followers: req.body.userId}});
                await currentUser.updateOne( {$pull: {following: req.params.id}});
                res.status(200).json("You unfollow a user");
            }else{
                res.status(403).json("You are not already a followers");
            }
        }catch(err){
            res.status(404).json(err)
        }
    }
});

//user friends
router.get("/friends/:username",async (req,res)=>{
    try{
        const user = await People.findOne({username: req.params.username});
        const friends = await Promise.all(
            user.following.map(friendId=>{
                return People.findById(friendId)
            })
        )
        let freindList = [];
        friends.map(friend=>{
            const {_id,username,profilePic,desc} =friend;
            freindList.push({_id,username,profilePic,desc});
        });
        res.status(200).json(freindList)
    }catch(err){
       res.status(403).json(err)
    }
})

//get People you may know

router.get("/all",async(req,res)=>{
    try{
        const allUser = await People.find({})
        let freindList = [];
        allUser.map(User=>{
            const {_id,username,profilePic,desc} =User;
            freindList.push({_id,username,profilePic,desc});
        });
        res.status(200).json(freindList)
    }catch(err){
        res.status(402).json(err)
    } 
})


module.exports = router;