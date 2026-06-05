const express =  require("express");
const mongoose =  require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.listen(5000,()=>{
    console.log("Port is running on 5000");
});

const userroutes = require("./Routers/UserRoutes");
app.use("/api/user",userroutes);

mongoose
.connect(process.env.MONGO_URL)
.then(()=> {
    console.log("Mongodb connected successfully");
})
.catch((err)=>{
    console.log("Mongodb connection failed", err);
})
