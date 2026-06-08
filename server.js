const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "../fabfit/src/Assets/Images")));

const userroutes = require("./Routers/UserRoutes");
const productroutes = require("./Routers/ProductRoutes");
const orderroutes = require("./Routers/OrderRoutes");
const adminuserroutes = require("./Routers/AdminUserRoutes");

app.use("/api/user", userroutes);
app.use("/api/products", productroutes);
app.use("/api/orders", orderroutes);
app.use("/api/admin/users", adminuserroutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB Atlas");
    app.listen(5000, () => {
        console.log("Port is running on 5000");
    });
}).catch(err => {
    console.error("MongoDB connection error:", err);
});
