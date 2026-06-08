const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserModel = require("./Models/UserModel");
require("dotenv").config();

const adminAccounts = [
    {
        email: "suryasekar626@gmail.com",
        password: "Surya@123",
        firstname: "Surya",
        lastname: "Sekar"
    },
    {
        email: "admin@gmail.com",
        password: "Admin@123",
        firstname: "Admin",
        lastname: "User"
    }
];

async function seedAdmin() {
    try {
        if (!process.env.MONGO_URI) {
            console.error("MONGO_URI is not defined in the environment variables.");
            process.exit(1);
        }

        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB successfully!");

        for (const account of adminAccounts) {
            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(account.password, salt);

            // Check if user already exists
            let user = await UserModel.findOne({ email: account.email });

            if (user) {
                console.log(`User with email ${account.email} already exists. Updating credentials and isAdmin flag...`);
                user.password = hashedPassword;
                user.isAdmin = true;
                user.firstname = account.firstname;
                user.lastname = account.lastname;
                await user.save();
                console.log(`Admin user '${account.email}' updated successfully!`);
            } else {
                console.log(`Creating new admin user with email ${account.email}...`);
                user = new UserModel({
                    firstname: account.firstname,
                    lastname: account.lastname,
                    email: account.email,
                    phone: "0000000000",
                    password: hashedPassword,
                    isAdmin: true
                });
                await user.save();
                console.log(`Admin user '${account.email}' created successfully!`);
            }
        }

        mongoose.connection.close();
        console.log("Database connection closed.");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding admin users:", error);
        process.exit(1);
    }
}

seedAdmin();
