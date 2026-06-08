const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    discount: { type: String },
    rating: { type: Number, default: 0 },
    category: { type: String, required: true },
    image: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);
