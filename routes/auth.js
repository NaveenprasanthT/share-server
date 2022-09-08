const router = require("express").Router();
const People = require("../models/People")

const bcrypt = require("bcrypt");

//Register
router.post("/register", async (req,res)=>{
  
    try{
        //password encryption
        const salt = await bcrypt.genSalt(10);
        const hiddedpassword = await bcrypt.hash(req.body.password, salt);

        //creating new user
        const newUser = new People({
            username:req.body.username,
            password:hiddedpassword,
            mail:req.body.mail,
        });

        //response
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
});

//login
router.post("/login",async (req,res)=>{
    try{
        const user = await People.findOne({mail: req.body.mail});
        if (!user) return res.status(400).json("User not found");

        const crtPassword = await bcrypt.compare(req.body.password, user.password);
        if (!crtPassword) return res.status(404).json("Incorrect Pasword");

        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;