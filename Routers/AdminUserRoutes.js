const express = require("express");
const router = express.Router();
const { getAllUsers, deleteUser } = require("../Controllers/AdminUserController");
const { verifyToken } = require("../Utils/AuthMiddleware");

router.get("/", verifyToken, getAllUsers);
router.delete("/:id", verifyToken, deleteUser);

module.exports = router;
