const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    userEmail: { type: String, required: true },
    items: [
        {
            productId: { type: Number, required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            image: { type: String }
        }
    ],
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    shipping: { type: Number, default: 0 },
    total: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Shipped", "Delivered"], default: "Pending" },
    shippingAddress: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zipCode: { type: String }
    }
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
