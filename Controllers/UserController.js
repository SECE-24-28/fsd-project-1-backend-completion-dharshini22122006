const User = require("../Models/UserModel");

const signupUser = async(req,res) => {
    try{
        const {firstname,lastname,email,phone,password} = req.body;
        const NewUser = new User({
            firstname,
            lastname,
            email,
            phone,
            password
        });
        const SaveUser = await NewUser.save();
        res.status(200).json({
            message:"User Registered Successfully",
            data:SaveUser,

        });
    }
    catch(error){
        res.status(404).json({
            message:"Error Registering in User",
            error:error.message,
        });
    }
}

module.exports = {signupUser};