const express = require("express");
const app = express();

const mongoose = require("mongoose");
const helmet = require("helmet");
const dotenv = require("dotenv");
const morgan = require("morgan");

const useRoute = require("./routes/users.js");
const useAuth = require("./routes/auth.js");
const usePost = require("./routes/posts.js");
const useProfile = require("./routes/profile.js");


dotenv.config();

mongoose 
 .connect(process.env.MONGO_DB,)   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


app.use("/api/users",useRoute)
app.use("/api/auth",useAuth)
app.use("/api/posts",usePost)
app.use("/api/profile",useProfile)

app.listen(8900,()=>{
    console.log("Backend server connected")
})