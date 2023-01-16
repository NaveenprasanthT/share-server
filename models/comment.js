const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    postId:{
        type:String,
        require:true
    },
    userId:{
        type:String,
        require:true
    },
    img:{
        type:String
    },
    likes:{
        types:Array,
        default:[]
    },
    content:{
        type:String,
        require:true
    }
},
{timestamps:true}
);

module.exports = mongoose.model("Comment",CommentSchema)