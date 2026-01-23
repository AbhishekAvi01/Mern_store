const express = require('express');
const router = express.Router();

// Sabhi controllers ko import karein
const { 
    getProducts, 
    getProductById, 
    createProduct, 
    deleteProduct 
} = require('../controllers/productController');

// Middlewares import karein (Security ke liye)
const { protect, admin } = require('../middleware/authMiddleware');

// --- ROUTES ---

// @desc: Saare products GET karna (Sabke liye) aur Naya product POST karna (Sirf Admin)
router.route('/')
    .get(getProducts) 
    .post(protect, admin, createProduct); 

// @desc: ID se GET karna (Sabke liye) aur DELETE karna (Sirf Admin)
router.route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct);


    // backend/routes/productRoutes.js
const { updateProduct } = require('../controllers/productController');

// ID wale route par PUT method add karein
router.route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct); // Naya line

module.exports = router;