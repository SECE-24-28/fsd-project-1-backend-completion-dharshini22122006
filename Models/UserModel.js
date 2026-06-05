const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    phone:String,
    password:String,
    
});

module.exports = mongoose.model("User",UserSchema);