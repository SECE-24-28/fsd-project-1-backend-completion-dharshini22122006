const ProductModel = require("../Models/ProductModel");

const getProducts = async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = {};

        if (category && category !== "All") {
            query.category = new RegExp(`^${category}$`, "i");
        }

        if (search) {
            query.name = new RegExp(search, "i");
        }

        const products = await ProductModel.find(query).sort({ id: 1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findOne({ id: Number(id) });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product details", error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await ProductModel.findOneAndUpdate(
            { id: Number(id) },
            req.body,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await ProductModel.findOneAndDelete({ id: Number(id) });

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
};

const addProduct = async (req, res) => {
    try {
        const maxProduct = await ProductModel.findOne().sort("-id");
        const nextId = maxProduct && maxProduct.id ? maxProduct.id + 1 : 1;

        const newProduct = new ProductModel({ ...req.body, id: nextId });
        await newProduct.save();

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Error adding product", error: error.message });
    }
};

module.exports = { getProducts, getProductById, updateProduct, deleteProduct, addProduct };
