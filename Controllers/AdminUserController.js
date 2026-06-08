const UserModel = require("../Models/UserModel");

// GET all users (admin)
const getAllUsers = async (req, res) => {
    try {
        const dbUsers = await UserModel.find({});

        const users = dbUsers.map(u => ({
            id: u._id,
            email: u.email,
            firstname: u.firstname || "",
            lastname: u.lastname || "",
            phone: u.phone || "",
            createdAt: u.createdAt,
            lastSignIn: u.updatedAt, // Approximation since we don't track lastSignIn specifically
            isAdmin: u.isAdmin || false
        }));

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};

// DELETE user (admin)
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await UserModel.findByIdAndDelete(id);

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};

module.exports = { getAllUsers, deleteUser };
