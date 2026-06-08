const express = require("express");
const router = express.Router();
const { getProducts, getProductById, updateProduct, deleteProduct, addProduct } = require("../Controllers/ProductController");

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
