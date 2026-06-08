const mongoose = require("mongoose");
const Product = require("./Models/ProductModel");
const products = require("./Data/products.json");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB for seeding");
    await Product.deleteMany({});
    console.log("Cleared existing products");
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products successfully`);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Connection failed", err);
  });

