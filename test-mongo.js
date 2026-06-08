const mongoose = require('mongoose');

const uri = "mongodb+srv://root:root@cluster0.b9zpugv.mongodb.net/?appName=Cluster0";

async function run() {
  try {
    console.log("Attempting to connect to MongoDB Atlas...");
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000, family: 4 });
    console.log("Successfully connected to MongoDB Atlas!");
    process.exit(0);
  } catch (error) {
    console.error("Connection failed!");
    console.error(error);
    process.exit(1);
  }
}

run();
