const OrderModel = require("../Models/OrderModel");

// ─── Create Order ────────────────────────────────────────────────
const createOrder = async (req, res) => {
    try {
        const { items, subtotal, discount, shipping, total, shippingAddress } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "No items in the order" });
        }

        const newOrder = new OrderModel({
            userId: req.user?.id || "guest",
            userEmail: req.user?.email || "guest",
            items,
            subtotal,
            discount,
            shipping,
            total,
            shippingAddress,
            status: "Pending"
        });

        await newOrder.save();

        res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
        res.status(500).json({ message: "Error placing order", error: error.message });
    }
};

// ─── Get Orders for User ──────────────────────────────────────────
const getOrders = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const userOrders = await OrderModel.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(userOrders);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving orders", error: error.message });
    }
};

// ─── Get ALL Orders (Admin) ───────────────────────────────────────
const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find().sort({ createdAt: -1 });

        // Map _id to id for frontend compatibility
        const formattedOrders = orders.map(o => ({
            ...o.toObject(),
            id: o._id
        }));

        res.status(200).json(formattedOrders);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving all orders", error: error.message });
    }
};

// ─── Update Order Status (Admin) ──────────────────────────────────
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updatedOrder = await OrderModel.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Order updated", order: { ...updatedOrder.toObject(), id: updatedOrder._id } });
    } catch (error) {
        res.status(500).json({ message: "Error updating order", error: error.message });
    }
};

// ─── Delete Order (Admin) ─────────────────────────────────────────
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOrder = await OrderModel.findByIdAndDelete(id);

        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Order deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting order", error: error.message });
    }
};

module.exports = { createOrder, getOrders, getAllOrders, updateOrderStatus, deleteOrder };
