const UserModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = process.env.JWT_SECRET || "fabfit_secret_key_123";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@gmail.com";

const signupUser = async (req, res) => {
    try {
        const { firstname, lastname, email, phone, password } = req.body;

        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const isAdmin = email === ADMIN_EMAIL;

        // Create new user
        const newUser = new UserModel({
            firstname,
            lastname,
            email,
            phone: phone || "",
            password: hashedPassword,
            isAdmin
        });

        const savedUser = await newUser.save();

        // Generate JWT token
        const token = jwt.sign(
            { id: savedUser._id, email: savedUser.email, isAdmin: savedUser.isAdmin },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            message: "User Registered Successfully",
            token,
            data: {
                id: savedUser._id,
                firstname: savedUser.firstname,
                lastname: savedUser.lastname,
                email: savedUser.email,
                phone: savedUser.phone,
                isAdmin: savedUser.isAdmin
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Error Registering User",
            error: error.message,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Check if user exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, isAdmin: user.isAdmin },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            message: "Login Successful",
            token,
            data: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                phone: user.phone,
                isAdmin: user.isAdmin
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Error logging in user",
            error: error.message
        });
    }
};

module.exports = { signupUser, loginUser };