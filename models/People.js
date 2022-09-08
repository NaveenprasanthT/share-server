const mongoose = require("mongoose");

const PeopleSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:3,
        max:20,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:7
    },
    mail:{
        type:String,
        required:true,
        max:50,
        unique:true
    },
    city:{
        type:String,
        max:50,
    },
    desc:{
        type:String,
        max: 50,
    },
    from:{
        type:String,
        max: 50,
    },
    relationship:{
        type:Number,
        enum:[1,2,3]
    },
    isAdmin:{
        type:Boolean,
        deafault:false
    },
    profilePic:{
        type:String,
        default:""
    },
    coverfilePic:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
},
{timestamps:true}
);

module.exports = mongoose.model("People",PeopleSchema);