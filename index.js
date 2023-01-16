const express = require("express");
const cors = require("cors")
const app = express();

const mongoose = require("mongoose");
const helmet = require("helmet");
const dotenv = require("dotenv");
const morgan = require("morgan");

const useRoute = require("./routes/users.js");
const useAuth = require("./routes/auth.js");
const usePost = require("./routes/posts.js");
const useProfile = require("./routes/profile.js");
const useComment = require("./routes/comments.js")

dotenv.config();

mongoose 
 .connect("mongodb+srv://naveenprasanth:naveen777@cluster0.e8tk9bc.mongodb.net/Share?retryWrites=true&w=majority",)   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());


app.use("/api/users",useRoute)
app.use("/api/auth",useAuth)
app.use("/api/posts",usePost)
app.use("/api/profile",useProfile)
app.use("/api/comment",useComment)

app.get("/",(req,res)=>{
    res.status(200).json("The new beggining...")
})

app.listen(process.env.PORT || 8000,()=>{
    console.log("Backend server connected")
})
