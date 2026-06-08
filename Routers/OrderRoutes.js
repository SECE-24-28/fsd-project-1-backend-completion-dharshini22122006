const express = require("express");
const router = express.Router();
const { createOrder, getOrders, getAllOrders, updateOrderStatus, deleteOrder } = require("../Controllers/OrderController");
const { verifyToken } = require("../Utils/AuthMiddleware");

router.post("/", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);
router.get("/all", verifyToken, getAllOrders);
router.put("/:id/status", verifyToken, updateOrderStatus);
router.delete("/:id", verifyToken, deleteOrder);

module.exports = router;
