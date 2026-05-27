const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// GET /api/products - Get all products
router.get('/', productController.getAllProducts);

// GET /api/products/:id - Get product by id
router.get('/:id', productController.getProductById);

// POST /api/products - Create new product
router.post('/', productController.createProduct);

// PUT /api/products/:id/status - Update product status
router.put('/:id/status', productController.updateProductStatus);

module.exports = router;